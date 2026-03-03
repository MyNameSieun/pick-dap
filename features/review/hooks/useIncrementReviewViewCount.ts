// features/review/hooks/useIncrementReviewViewCount.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { incrementReviewViewCount } from '../services/incrementReviewViewCount';

export const useIncrementReviewViewCount = (
  callbacks?: UseMutationCallback,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => incrementReviewViewCount(reviewId),

    onSuccess: (reviewId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.review.detail(reviewId),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
