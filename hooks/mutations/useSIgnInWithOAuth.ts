import { signInWithOAuth } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export const useSIgnInWithOAuth = () => {
  return useMutation({ mutationFn: signInWithOAuth });
};
