import { Button } from '@/components/ui/button/Button';

import Link from 'next/link';
import SocialSignupButton from '@/features/auth/SocialSignupButton';
import AuthHeader from '@/features/auth/AuthHeader';
import SignupInput from '@/features/auth/SignupInput';

const SignupPage = () => {
  return (
    <div className="mx-auto w-200">
      <AuthHeader />

      <SignupInput />

      <div className="mt-5 mb-12 flex justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="h-4.5 w-4.5 rounded-full border border-gray-600 bg-white" />
          <p>이용약관 및 개인정보처리방침에 동의합니다</p>
        </div>
      </div>

      <div className="mb-4.5 flex flex-col">
        <Button variant={'default'} className="py-7">
          <h6>가입하기</h6>
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        <p className="text-gray-600 select-none">이미 계정이 있으신가요?</p>
        <p className="text-main-400 cursor-pointer font-bold">
          <Link href="/login">
            <u>로그인</u>
          </Link>
        </p>
      </div>

      <div className="mt-12 mb-16.5 flex items-center gap-8.5">
        <div className="h-px flex-1 bg-gray-300" />
        <p className="shrink-0 text-gray-700">SNS 계정으로 회원가입</p>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <SocialSignupButton />
    </div>
  );
};

export default SignupPage;
