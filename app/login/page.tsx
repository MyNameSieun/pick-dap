import Link from 'next/link';
import AuthHeader from '@/features/auth/AuthHeader';
import LoginInput from '@/features/auth/LoginInput';
import SocialButton from '@/features/auth/SocialButton';

const LoginPage = () => {
  return (
    <div className="mx-auto w-200">
      <AuthHeader />
      <LoginInput />

      <div className="flex justify-center gap-2">
        <p className="text-gray-600 select-none">계정이 없으신가요?</p>
        <p className="text-main-400 cursor-pointer font-bold">
          <Link href="/signup">
            <u>회원가입</u>
          </Link>
        </p>
      </div>

      <div className="mt-12 mb-16.5 flex items-center gap-8.5">
        <div className="h-px flex-1 bg-gray-300" />
        <p className="shrink-0 text-gray-700">SNS 계정으로 로그인</p>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <SocialButton />
    </div>
  );
};

export default LoginPage;
