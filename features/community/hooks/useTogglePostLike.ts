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
    mutationFn: ({ postId }) => togglePostLike({ postId }),

    onMutate: async ({ postId, slug }: { postId: string; slug: string }) => {
      const detailKey = QUERY_KEYS.post.detail(slug, user?.id);
      const listKey = QUERY_KEYS.post.all;

      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKey }),
      ]);

      const prevDetail = queryClient.getQueryData<mapToPostDetail>(detailKey);
      const prevList = queryClient.getQueryData<mapToPostDetail[]>(listKey);

      // 상세페이지
      if (prevDetail) {
        queryClient.setQueryData<mapToPostDetail>(detailKey, {
          ...prevDetail,
          isLiked: !prevDetail.isLiked,
          like_count: prevDetail.isLiked
            ? Math.max(0, prevDetail.like_count - 1)
            : prevDetail.like_count + 1,
        });
      }

      // 목록
      if (prevList) {
        queryClient.setQueryData<mapToPostDetail[]>(listKey, (old) =>
          old?.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  like_count: post.isLiked
                    ? post.like_count - 1
                    : post.like_count + 1,
                }
              : post,
          ),
        );
      }
      return { prevDetail, prevList, detailKey, listKey };
    },

    onError: (error, variables, context) => {
      if (context?.prevDetail) {
        queryClient.setQueryData(context.detailKey, context.prevDetail);
      }
      if (context?.prevList) {
        queryClient.setQueryData(context.listKey, context.prevList);
      }
      if (callbacks?.onError) callbacks.onError(error);
    },

    onSettled: (data, error, variables, context) => {
      if (context?.detailKey) {
        queryClient.invalidateQueries({ queryKey: context.detailKey });
      }
      if (context?.listKey) {
        queryClient.invalidateQueries({ queryKey: context.listKey });
      }
    },

    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
