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
      const { post_id, answer_id } = newComment;

      // post 페이지 댓글인 경우
      if (post_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byPostId(post_id),
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.myPostComments(post_id),
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.post.myList,
        });
      }

      // answer 페이지의 댓글인 경우
      if (answer_id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.byAnswerId(answer_id),
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.comment.myAnswerComments(answer_id),
        });
      }

      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comment.list });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
