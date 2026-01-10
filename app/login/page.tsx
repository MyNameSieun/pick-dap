import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import logo from '@/public/logo/logo.png';
import Image from 'next/image';

import googleLogo from '@/public/logo/goggle-logo.png';
import kakaoLogo from '@/public/logo/kakao-logo.png';
import githubLogo from '@/public/logo/github-logo.png';
import Link from 'next/link';
import PasswordResetModa from '@/components/modal/PasswordResetModa';

const LoginPage = () => {
  return (
    <div className="mx-auto w-200">
      <div className="flex flex-col items-center">
        <Image width={230} src={logo} alt="logo" />
        <h3 className="text-main-400 mb-9">AI로 완성하는 면접 준비, 픽답</h3>
      </div>

      <div className="flex flex-col gap-3">
        <Input type="email" placeholder="아이디 (이메일)" className="b1 py-7" />
        <Input type="password" placeholder="비밀번호" className="b1 py-7" />
      </div>

      <div className="mt-5 mb-12 flex justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <div className="h-4.5 w-4.5 rounded-full border border-gray-600 bg-white" />
          <p> 로그인 상태 유지</p>
        </div>

        <div className="flex gap-4">
          <p className="text-main-400 cursor-pointer">아이디 찾기</p>
          <p className="text-gray-400 select-none">|</p>
          <p className="text-main-400 cursor-pointer">비밀번호 찾기</p>
        </div>
      </div>

      <div className="mb-4.5 flex flex-col">
        <Button variant={'default'} className="py-7">
          <h6>로그인</h6>
        </Button>
      </div>

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

      <div className="flex justify-center gap-6">
        <button className="bg-bg-light cursor-pointer rounded-full p-4.5 shadow-md">
          <Image width="40" height="40" src={googleLogo} alt="google-logo" />
        </button>

        <button className="cursor-pointer rounded-full bg-[#FEE500] p-4.5 shadow-md">
          <Image width="40" height="40" src={kakaoLogo} alt="kakao-logo" />
        </button>

        <button className="cursor-pointer rounded-full bg-[#010101] p-4.5 shadow-md">
          <Image width="40" height="40" src={githubLogo} alt="github-logo" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
