import { signInWithOAuth } from '@/services/auth.client';
import { useMutation } from '@tanstack/react-query';

export const useSignInWithOAuth = () => {
  return useMutation({ mutationFn: signInWithOAuth });
};
