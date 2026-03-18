import { useMutation } from '@tanstack/react-query';

import {
  createAiInterview,
  CreateInterviewParams,
} from '../services/createAiInterview';
import { UseMutationCallback } from '@/types/useMutationCallback';

type CreateInterviewResult = Awaited<ReturnType<typeof createAiInterview>>;

export const useCreateInterview = (
  callbacks?: UseMutationCallback<CreateInterviewResult>,
) => {
  return useMutation({
    mutationFn: (params: CreateInterviewParams) => createAiInterview(params),
    onSuccess: (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
