import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { createQuestion } from '../../services/question/createQuestion';
import { QuestionEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

export const useCreateQuestion = (
  callbacks?: UseMutationCallback<QuestionEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: async (newQuestion) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.question.list(),
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess(newQuestion);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
