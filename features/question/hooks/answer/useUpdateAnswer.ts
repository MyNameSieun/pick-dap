import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { updateAnswer } from '../../services/answer/updateAnswer';

export const useUpdateAnswer = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnswer,
    onSuccess: async (updatedData) => {
      if (updatedData) {
        queryClient.setQueryData(
          QUERY_KEYS.answer.byUserAndQuestion(
            updatedData.question_id,
            updatedData.user_id,
          ),
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
