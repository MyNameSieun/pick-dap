import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../services/deletePost';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { PostEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

const useDeletePost = (callbacks?: UseMutationCallback<PostEntity>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (slug) => {
      if (slug) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.post.categoryList({ categorySlug: slug }),
        });
      }

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};

export default useDeletePost;
