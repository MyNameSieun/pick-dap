// features/question/hooks/comment/useCreateComment.ts

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
      // 1. post 페이지 댓글인 경우
      if (newComment.post_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byPostId(newComment.post_id),
        });
      }

      // 2. answer 페이지의 댓글인 경우
      if (newComment.answer_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byAnswerId(newComment.answer_id),
        });
      }
      // 3. 전체 댓글 목록 업데이트 (정렬을 위함)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comment.list });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
