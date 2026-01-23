// src/hooks/mutations/useSignUp.ts
import { signUp } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입 성공!');
    },
    onError: (error: Error) => {
      alert(`회원가입 실패: ${error.message}`);
    },
  });
};
