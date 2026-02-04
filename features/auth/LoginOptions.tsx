'use client';

import { usePasswordResetModalActions } from '@/store/modal/passwordResetModal';

const LoginOptions = () => {
  const { open } = usePasswordResetModalActions();

  return (
    <>
      <div onClick={open} className="flex gap-4">
        <p className="text-main-400 cursor-pointer">아이디 찾기</p>
        <p className="text-gray-400 select-none">|</p>
        <p className="text-main-400 cursor-pointer">비밀번호 찾기</p>
      </div>
    </>
  );
};

export default LoginOptions;
