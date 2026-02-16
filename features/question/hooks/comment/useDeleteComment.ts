import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../services/comment/deleteComment';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { CommentEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

export const useDeleteComment = (
  answerId: string,
  callbacks?: UseMutationCallback<CommentEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comment.byAnswerId(answerId),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
