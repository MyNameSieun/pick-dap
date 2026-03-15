import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { CommentEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';
import { deleteAnswerComment } from '../../services/comment/deleteAnswerComment';

export const useDeleteAnswerComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnswerComment,
    onSuccess: (deletedComment) => {
      if (deletedComment?.answer_id) {
        queryClient.setQueryData<CommentEntity[]>(
          QUERY_KEYS.comment.byAnswerId(deletedComment.answer_id),
          (old) => {
            if (!old) return [];
            return old.filter(
              (comment) =>
                comment.id !== deletedComment.id &&
                comment.parent_id !== deletedComment.id,
            );
          },
        );
      }

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
