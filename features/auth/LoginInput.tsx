import { Input } from '@/components/ui/input/Input';
import React from 'react';
import LoginOptions from './LoginOptions';

const LoginInput = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Input type="email" placeholder="아이디 (이메일)" className="b1 py-7" />
        <Input type="password" placeholder="비밀번호" className="b1 py-7" />
      </div>
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
