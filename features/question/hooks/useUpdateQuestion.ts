import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { updateQuestion } from '../services/updateQuestion';
import { QuestionWithDetails } from '../services/fetchQuestion';

export const useUpdateQuestion = (
  callbacks?: UseMutationCallback<QuestionWithDetails>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.question.byId(String(data.idx)),
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
