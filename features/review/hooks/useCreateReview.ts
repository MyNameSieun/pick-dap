import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import createReview from '../services/createReview';
import { QUERY_KEYS } from '@/lib/constants';
import { ReviewQuestionTypeEntity } from '@/types/entity';

export const useCreateReview = (
  callbacks?: UseMutationCallback<ReviewQuestionTypeEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.review.list,
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
