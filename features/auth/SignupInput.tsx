'use client';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
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

  const onSubmit = (data: SignupFormData) => {
    console.log('검증 완료된 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <Input
          {...register('email')}
          aria-invalid={
            isSubmitted ? (errors.email ? 'true' : 'false') : undefined
          }
          type="email"
          placeholder="아이디 (이메일)"
          className="b1 py-7"
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
          placeholder="비밀번호  (영문, 숫자, 특수문자를 포함한 8~20자)"
          className="b1 py-7"
        />
        {errors.password && (
          <p className="c1 text-red-600" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register('confirmPassword')}
          aria-invalid={
            isSubmitted
              ? errors.confirmPassword
                ? 'true'
                : 'false'
              : undefined
          }
          type="password"
          placeholder="비밀번호 확인"
          className="b1 py-7"
        />
        {errors.confirmPassword && (
          <p className="c1 text-red-600" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <>
        <div className="mt-5 mb-12 flex justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="h-4.5 w-4.5 rounded-full border border-gray-600 bg-white" />
            <p className="c1">이용약관 및 개인정보처리방침에 동의합니다</p>
          </div>
        </div>

        <div className="mb-4.5 flex flex-col">
          <Button type="submit" variant={'default'} className="py-7">
            <h6>가입하기</h6>
          </Button>
        </div>
      </>
    </form>
  );
};

export default SignupInput;
