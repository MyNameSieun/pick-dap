import { AnswerEntity } from '@/types/entity';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnswerQuestion } from '../services/createAnswerQuestion';
import { QUERY_KEYS } from '@/lib/constants';

export const useCreateQuestionAnswers = (
  callbacks?: UseMutationCallback<AnswerEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnswerQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer.list,
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
