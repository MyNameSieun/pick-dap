// hooks/mutations/useSignUp.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';
import { SignupFormData } from '@/types/schema';
import { signUp } from '@/services/auth';

export const useSignUp = (setError?: UseFormSetError<SignupFormData>) => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입 성공!');
      router.push('/');
    },
    onError: (error: Error) => {
      if (!setError) return;

      if (error.message.includes('이메일')) {
        setError('email', { type: 'server', message: error.message });
      } else if (error.message.includes('닉네임')) {
        setError('nickname', { type: 'server', message: error.message });
      } else {
        alert(error.message);
      }
    },
  });
};
