import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { createAnswer } from '../../services/answer/createAnswer';

export const useCreateAnswer = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnswer,
    onSuccess: (questionId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer.byQuestionId(questionId),
      });

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
