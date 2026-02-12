import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnswerQuestion } from '../services/updateAnswerQuestion';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';

export const useUpdateAnswerQuestion = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnswerQuestion,
    onSuccess: async (updatedData) => {
      if (updatedData) {
        queryClient.setQueryData(
          QUERY_KEYS.answer.byId(updatedData.question_id, updatedData.user_id),
          updatedData,
        );
      }
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
