import logo from '@/public/logo/logo.png';
import Image from 'next/image';

const AuthHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <Image width={230} src={logo} alt="logo" />
      <h3 className="text-main-400 mb-9">AI로 완성하는 면접 준비, 픽답</h3>
    </div>
  );
};

export default AuthHeader;
