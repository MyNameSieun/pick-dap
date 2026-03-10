import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/lib/constants';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { updateProject } from '../../services/project/updateProject';

export const useUpdateProject = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: async (updatedData) => {
      if (!updatedData) return;

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.project.all,
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess(updatedData);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
