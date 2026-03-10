import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../../services/project/createProject';
import { QUERY_KEYS } from '@/lib/constants';
import { ProjectEntity } from '@/types/entity';

export const useCreateProject = (
  callbacks?: UseMutationCallback<ProjectEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: async (newProject) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.project.myList,
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess(newProject);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
