import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../services/project/deleteProject';
import { ProjectEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';
import { UseMutationCallback } from '@/types/useMutationCallback';

export const useDeleteProject = (
  callbacks?: UseMutationCallback<ProjectEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (deletedSlug) => {
      const decodedSlug = decodeURIComponent(deletedSlug);

      queryClient.setQueryData<ProjectEntity[]>(
        QUERY_KEYS.project.myList,
        (oldList) => {
          if (!oldList) return [];
          return oldList.filter((project) => project.slug !== decodedSlug);
        },
      );

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.project.myDetail(decodedSlug),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
