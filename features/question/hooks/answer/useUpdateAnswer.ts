//features/question/hooks/useUpdateAnswer.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { updateAnswer } from '../../services/answer/updateAnswer';
import { AnswerEntity } from '../../services/answer/fetchAnswer';

export const useUpdateAnswer = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnswer,
    onSuccess: (updatedData) => {
      if (!updatedData) return null;

      // 1. 답변 리스트 업데이트
      queryClient.setQueryData<AnswerEntity[]>(
        QUERY_KEYS.answer.byQuestionId(updatedData.question_id!),
        (oldList) => {
          if (!oldList) return [];
          return oldList.map((answer) =>
            answer.id === updatedData.id
              ? { ...answer, ...updatedData }
              : answer,
          );
        },
      );

      // 2. 내 답변 (단일 객체) 업데이트
      queryClient.setQueryData<AnswerEntity>(
        QUERY_KEYS.answer.byQuestionIdMine(updatedData.question_id!),
        (oldMine) => {
          if (!oldMine) return updatedData as AnswerEntity;

          return { ...oldMine, ...updatedData };
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
