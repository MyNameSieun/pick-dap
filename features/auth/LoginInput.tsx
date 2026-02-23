'use client';

import { Input } from '@/components/ui/input/Input';
import LoginOptions from './LoginOptions';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/Button';
import { useSignInWithPassword } from '@/hooks/mutations/useSignInWithPassword';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginInput = () => {
  const {
    handleSubmit,
    register,

    formState: { isSubmitted, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    mutate: signInWithPassword,
    isPending: isSignInWithPassword,
    error,
  } = useSignInWithPassword();

  const onSubmit = (data: LoginFormData) => {
    signInWithPassword(data, {
      onSuccess: () => {
        const returnTo = searchParams.get('returnTo') || '/';
        router.push(returnTo);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            type="email"
            placeholder="아이디 (이메일)"
            className="b1 py-7"
            {...register('email')}
            aria-invalid={
              isSubmitted ? (errors.email ? 'true' : 'false') : undefined
            }
          />
          {errors.email && (
            <p className="c1 text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register('password')}
            aria-invalid={
              isSubmitted ? (errors.password ? 'true' : 'false') : undefined
            }
            type="password"
            placeholder="비밀번호"
            className="b1 py-7"
          />
          {errors.password && (
            <p className="c1 text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error.message}</p>}
        <div className="mb-4.5 flex flex-col">
          <Button
            disabled={isSignInWithPassword}
            type="submit"
            variant={'default'}
            className="py-7"
          >
            <h6> {isSignInWithPassword ? '로그인 중...' : '로그인'}</h6>
          </Button>
        </div>
      </form>

      <div className="mt-5 mb-12 flex justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="h-4.5 w-4.5 rounded-full border border-gray-600 bg-white" />
          <p> 로그인 상태 유지</p>
        </div>

        <LoginOptions />
      </div>
    </>
  );
};

export default LoginInput;
