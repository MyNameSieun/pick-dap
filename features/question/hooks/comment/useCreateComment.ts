import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../services/comment/createComment';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { CommentEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

export const useCreateComment = (
  callbacks?: UseMutationCallback<CommentEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      if (newComment.post_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byPostId(newComment.post_id),
        });
      }

      if (newComment.answer_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byAnswerId(newComment.answer_id),
        });
      }
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
