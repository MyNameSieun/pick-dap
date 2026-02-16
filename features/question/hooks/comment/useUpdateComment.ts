import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../services/comment/updateComment';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { CommentEntity } from '@/types/entity';

export const useUpdateComment = (
  answerId: string,
  callbacks?: UseMutationCallback,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      // 방법1. 캐시 직접 수정
      queryClient.setQueryData<CommentEntity[]>(
        QUERY_KEYS.comment.byAnswerId(answerId),
        (prev) =>
          prev?.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
      );
      // 방법2. 캐시 무효화
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.comment.byAnswerId(answerId),
      // });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
