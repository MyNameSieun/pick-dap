// featurs/question/hooks/comment/useDeleteAnswer.ts
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

    onSuccess: ({ questionId, answerId }) => {
      queryClient.setQueryData<AnswerEntity[]>(
        QUERY_KEYS.answer.byQuestionId(questionId),
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((answer) => answer.id !== answerId);
        },
      );

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
