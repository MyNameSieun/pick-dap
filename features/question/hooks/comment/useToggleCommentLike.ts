// features/question/hooks/comment/useToggleComentLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCommentLike } from '../../services/comment/toggleCommentLike';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { CommentEntity } from '../../services/comment/fetchComments';

export const useToggleCommentLike = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCommentLike,
    onMutate: async ({
      commentId,
      answerId,
    }: {
      commentId: string;
      answerId: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.comment.byAnswerId(answerId),
      });

      const previous = queryClient.getQueryData(
        QUERY_KEYS.comment.byAnswerId(answerId),
      );

      queryClient.setQueryData<CommentEntity[]>(
        QUERY_KEYS.comment.byAnswerId(answerId),
        (comment) =>
          comment?.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  isLiked: !c.isLiked,
                  like_count: c.isLiked ? c.like_count - 1 : c.like_count + 1,
                }
              : c,
          ),
      );
      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.comment.byAnswerId(variables.answerId),
          context.previous,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
