// features/review/hooks/useToggleReviewLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { toggleReviewLike } from '../services/toggleReviewLike';
import { mapToReviewDetail } from '../services/fetchReviewData';

export const useToggleReviewLike = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReviewLike,

    onMutate: async ({ reviewId }: { reviewId: string }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.review.detail(reviewId),
      });

      const previous = queryClient.getQueryData<mapToReviewDetail>(
        QUERY_KEYS.review.detail(reviewId),
      );

      if (previous) {
        queryClient.setQueryData<mapToReviewDetail>(
          QUERY_KEYS.review.detail(reviewId),
          {
            ...previous,
            isLiked: !previous.isLiked,
            like_count: previous.isLiked
              ? previous.like_count - 1
              : previous.like_count + 1,
          },
        );
      }

      return { previous };
    },

    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.review.detail(variables.reviewId),
          context.previous,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },

    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
