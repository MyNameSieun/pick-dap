// features/question/hooks/comment/useUpdateComment.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../services/comment/updateComment';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { CommentEntity } from '../../services/comment/fetchComments';

export const useUpdateComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,

    onSuccess: (updatedComment) => {
      queryClient.setQueryData<CommentEntity[]>(
        QUERY_KEYS.comment.byAnswerId(updatedComment.answer_id!),
        (prev) => {
          if (!prev) return prev;

          return prev.map((c) =>
            c.id === updatedComment.id
              ? { ...c, ...updatedComment } // 기존 데이터 위에 새 데이터를 덮어씀
              : c,
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
