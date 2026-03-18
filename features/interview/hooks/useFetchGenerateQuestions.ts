import { useMutation } from '@tanstack/react-query';
import {
  fetchGenerateQuestions,
  GenerateQuestionsRequest,
} from '../services/fetchGenerateQuestions';
import { UseMutationCallback } from '@/types/useMutationCallback';

const useFetchGenerateQuestions = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: (options: GenerateQuestionsRequest) =>
      fetchGenerateQuestions(options),
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};

export default useFetchGenerateQuestions;
