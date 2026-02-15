import { AnswerEntity } from '@/types/entity';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAnswer } from '../../services/answer/deleteAnswer';
import { QUERY_KEYS } from '@/lib/constants';

export const useDeleteAnswer = (
  callbacks?: UseMutationCallback<AnswerEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnswer,

    onSuccess: ({ questionId, userId }) => {
      if (userId) {
        queryClient.setQueryData(
          QUERY_KEYS.answer.byUserAndQuestion(questionId, userId),
          null,
        );
      }
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
