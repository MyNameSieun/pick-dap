import { signInWithPassword } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  });
};
