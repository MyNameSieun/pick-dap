import { signInWithPassword } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useSignInWithPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      router.push('/');
    },
  });
};
