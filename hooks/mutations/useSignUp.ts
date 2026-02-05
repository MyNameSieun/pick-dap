// hooks/mutations/useSignUp.ts
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/auth';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
