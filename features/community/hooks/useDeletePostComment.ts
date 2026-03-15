import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { CommentEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';
import deletePostComment from '../services/deletePostComment';

export const useDeletePostComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: (deletedComment) => {
      queryClient.setQueryData<CommentEntity[]>(
        QUERY_KEYS.comment.byPostId(deletedComment.post_id!),
        (old) => {
          if (!old) return [];
              return old.filter(
            (comment) =>
              comment.id !== deletedComment.id &&
              comment.parent_id !== deletedComment.id,
          );
        },
      );

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
