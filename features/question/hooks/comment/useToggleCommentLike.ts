// features/question/hooks/comment/useToggleComentLike.ts
import { useMutation } from '@tanstack/react-query';
import { toggleCommentLike } from '../../services/comment/toggleCommentLike';
import { UseMutationCallback } from '@/types/useMutationCallback';

export const useToggleCommentLike = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: toggleCommentLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
