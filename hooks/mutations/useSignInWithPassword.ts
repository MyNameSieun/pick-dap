import { signInWithPassword } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

export const useSignInWithPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    },
    onError: (error) => {
      console.log('에러 발생: ', error.message);
    },
  });
};
