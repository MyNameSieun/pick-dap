import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedPost, updatePost } from '../services/updatePost';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { toast } from 'sonner';

export const useUpdatePost = (callbacks?: UseMutationCallback<UpdatedPost>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async (updateData) => {
      if (!updateData) return;

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.all,
      });

      queryClient.setQueryData(
        QUERY_KEYS.post.detail(updateData.slug),
        updateData,
      );

      if (callbacks?.onSuccess) callbacks.onSuccess(updateData);
    },
    onError: (error) => {
      console.error('Update Error:', error);
      toast.error('수정 중 오류가 발생했습니다.');
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
