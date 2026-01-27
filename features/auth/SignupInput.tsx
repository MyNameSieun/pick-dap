'use client';

import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useSignUp } from '@/hooks/mutations/useSignUp';
import { SignupFormData, signupSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SignupInput = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const { mutate: signUp, isPending, error } = useSignUp();

  const onSubmit = (data: SignupFormData) => {
    signUp({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* 이메일 */}
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="아이디 (이메일)"
          className="b1 py-7"
          aria-invalid={
            isSubmitted ? (errors.email ? 'true' : 'false') : undefined
          }
        />
        {errors.email ? (
          <p className="c1 text-red-600">{errors.email.message}</p>
        ) : error?.message?.includes('이메일') ? (
          <p className="c1 text-red-600">{error.message}</p>
        ) : null}
      </div>

      {/* 닉네임 */}
      <div>
        <Input
          {...register('username')}
          type="text"
          placeholder="닉네임"
          className="b1 py-7"
          aria-invalid={
            isSubmitted ? (errors.username ? 'true' : 'false') : undefined
          }
        />
        {errors.username ? (
          <p className="c1 text-red-600">{errors.username.message}</p>
        ) : error?.message?.includes('닉네임') ? (
          <p className="c1 text-red-600">{error.message}</p>
        ) : null}
      </div>

      {/* 비밀번호 */}
      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8~20자)"
          className="b1 py-7"
          disabled={isPending}
          aria-invalid={
            isSubmitted ? (errors.password ? 'true' : 'false') : undefined
          }
        />
        {errors.password && (
          <p className="c1 text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <Input
          {...register('confirmPassword')}
          type="password"
          placeholder="비밀번호 확인"
          className="b1 py-7"
          disabled={isPending}
          aria-invalid={
            isSubmitted
              ? errors.confirmPassword
                ? 'true'
                : 'false'
              : undefined
          }
        />
        {errors.confirmPassword && (
          <p className="c1 text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>
      {error &&
        !error.message?.includes('이메일') &&
        !error.message?.includes('닉네임') && (
          <p className="text-center text-sm text-red-500">{error.message}</p>
        )}
      {/* 약관 */}
      <div className="mt-5 mb-12 flex items-center gap-2 text-gray-600">
        <div className="h-4.5 w-4.5 rounded-full border border-gray-600" />
        <p className="c1">이용약관 및 개인정보처리방침에 동의합니다</p>
      </div>

      <Button
        type="submit"
        variant="default"
        className="py-7"
        disabled={isPending || isSubmitting}
      >
        <h6>가입하기</h6>
      </Button>
    </form>
  );
};

export default SignupInput;
