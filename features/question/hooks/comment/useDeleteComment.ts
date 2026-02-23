// features/question/hooks/comment/useDeleteComment.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../services/comment/deleteComment';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { CommentEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

export const useDeleteComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedComment) => {
      queryClient.setQueryData<CommentEntity[]>(
        QUERY_KEYS.comment.byAnswerId(deletedComment.answer_id!),
        (old) => {
          if (!old) return [];
          return old?.filter((comment) => comment.id !== deletedComment.id);
        },
      );

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
