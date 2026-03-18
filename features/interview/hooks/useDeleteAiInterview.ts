import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { AiInterviewEntity } from '@/types/entity';
import deleteAiInterviews from '../services/deleteAiInterviews';

const useDeleteAiInterview = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAiInterviews,
    onSuccess: (deletedIds) => {
      queryClient.setQueryData<AiInterviewEntity[]>(
        QUERY_KEYS.aiInterview.myList(),
        (prev) => {
          if (!prev) return prev;
          return prev.filter((item) => !deletedIds.includes(item.id));
        },
      );

      if (callbacks?.onSuccess) return callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};

export default useDeleteAiInterview;
