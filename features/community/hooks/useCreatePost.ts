import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../services/createPost';
import { PostEntity } from '@/types/entity';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';

export const useCreatePost = (callbacks?: UseMutationCallback<PostEntity>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list,
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess(newPost);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
