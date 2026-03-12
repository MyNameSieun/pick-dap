import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { mapToPostDetail } from '../services/fetchPostsData';
import { togglePostLike } from '../services/togglePostLike';
import { useSession } from '@/store/session';

export const useTogglePostLike = (
  callbacks?: UseMutationCallback<mapToPostDetail>,
) => {
  const queryClient = useQueryClient();
  const user = useSession()?.user;

  return useMutation({
    mutationFn: togglePostLike,

    onMutate: async ({ postId, slug }: { postId: string; slug: string }) => {
      const queryKey = QUERY_KEYS.post.detail(slug, user?.id);

      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<mapToPostDetail>(queryKey);

      if (previous) {
        queryClient.setQueryData<mapToPostDetail>(queryKey, {
          ...previous,
          isLiked: !previous.isLiked,
          like_count: previous.isLiked
            ? Math.max(0, previous.like_count - 1)
            : previous.like_count + 1,
        });
      }

      return { previous, queryKey };
    },

    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.queryKey, context.previous);
      }
      if (callbacks?.onError) callbacks.onError(error);
    },

    onSettled: (data, error, variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
