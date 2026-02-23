import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { updateQuestion } from '../../services/question/updateQuestion';
import { QuestionWithDetails } from '../../services/question/fetchQuestion';

export const useUpdateQuestion = (
  callbacks?: UseMutationCallback<QuestionWithDetails>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: async (updatedData) => {
      if (!updatedData) return;

      // 1. 질문 리스트 업데이트
      // 리스트 전체 질문 목록 중 내가 수정한 답변만 map으로 교체
      queryClient.setQueryData<QuestionWithDetails[]>(
        QUERY_KEYS.question.list(),
        (oldList) => {
          if (!oldList) return oldList;
          return oldList.map((q) =>
            // 수정된 내용만 업데이트
            q.id === updatedData.id ? { ...q, ...updatedData } : q,
          );
        },
      );

      // 2. 상세 페이지 캐시도 즉시 업데이트 (단일 객체)
      queryClient.setQueryData(
        QUERY_KEYS.question.detail(updatedData.idx),
        (oldDetail: QuestionWithDetails) => {
          if (!oldDetail) return oldDetail;

          // 기존 데이터가 있다면 합쳐주고, 없으면 새 데이터를 넣음
          return oldDetail ? { ...oldDetail, ...updatedData } : updatedData;
        },
      );
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
