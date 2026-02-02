import logo from '@/public/logo/logo.png';
import Image from 'next/image';

export const GlobalLoader = () => {
  return (
    <div className="bg-muted flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce flex-col items-center gap-4">
        <Image src={logo} alt="로고" height={150} width={150} />
      </div>
    </div>
  );
};
