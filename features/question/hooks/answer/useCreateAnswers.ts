import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { createAnswer } from '../../services/answer/createAnswer';

export const useCreateAnswer = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnswer,
    onSuccess: (questionId) => {
      // 이 질문에 달린 답변 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer.byQuestionId(questionId),
      });

      // 나의 답변 상태도 새로고침
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer.byQuestionIdMine(questionId),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
