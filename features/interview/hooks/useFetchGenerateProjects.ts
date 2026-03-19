import { useMutation } from '@tanstack/react-query';
import {
  fetchGenerateProjects,
  GenerateProjectsRequest,
} from '../services/fetchGenerateProjects';
import { UseMutationCallback } from '@/types/useMutationCallback';

export const useFetchGenerateProjects = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: (options: GenerateProjectsRequest) =>
      fetchGenerateProjects(options),
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
