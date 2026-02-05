import { useMutation } from '@tanstack/react-query';
import { createQuesion } from '../services/createQuesion';

export const useCreateQuesion = () => {
  return useMutation({
    mutationFn: createQuesion,
  });
};
