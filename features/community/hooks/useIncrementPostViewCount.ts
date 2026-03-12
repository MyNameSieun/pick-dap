import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { incrementPostViewCount } from '../services/incrementPostViewCount';

export const useIncrementPostViewCount = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => incrementPostViewCount(postId),

    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(postId),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
