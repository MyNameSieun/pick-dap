import { Input } from '@/components/ui/input/Input';

const SignupInput = () => {
  return (
    <div className="flex flex-col gap-3">
      <Input type="email" placeholder="아이디 (이메일)" className="b1 py-7" />
      <Input
        type="password"
        placeholder="비밀번호  (영문, 숫자, 특수문자를 포함한 8~20자)"
        className="b1 py-7"
      />
      <Input type="password" placeholder="비밀번호 확인" className="b1 py-7" />
    </div>
  );
};

export default SignupInput;
