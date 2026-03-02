import { InterviewReviewEntity } from '@/types/entity';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '../services/deleteReview';
import { QUERY_KEYS } from '@/lib/constants';

export const useDeleteReview = (
  callbacks?: UseMutationCallback<InterviewReviewEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: (deletedId: string) => {
      queryClient.setQueryData<InterviewReviewEntity[]>(
        QUERY_KEYS.review.list(),
        (prev) => {
          if (!prev) return prev;
          return prev.filter((q) => q.id != deletedId);
        },
      );
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
