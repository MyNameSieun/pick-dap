import { useMutation } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { createQuestion } from '../services/createQuestion';

export const useCreateQuesion = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
