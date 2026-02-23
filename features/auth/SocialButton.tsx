'use client';
import googleLogo from '@/public/logo/goggle-logo.png';
import kakaoLogo from '@/public/logo/kakao-logo.png';
import githubLogo from '@/public/logo/github-logo.png';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useSignInWithOAuth } from '@/hooks/mutations/useSignInWithOAuth';

const SocialButton = () => {
  const searchParams = useSearchParams();
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth();
  const isPending = isSignInWithOAuthPending;

  const handleOAuthLogin = (provider: 'google' | 'github' | 'kakao') => {
    const returnTo = searchParams.get('returnTo') || '/';

    signInWithOAuth({ provider, returnTo });
  };

  return (
    <div className="flex justify-center gap-6">
      <button
        onClick={() => handleOAuthLogin('google')}
        disabled={isPending}
        className="bg-bg-light cursor-pointer rounded-full p-4.5 shadow-md"
      >
        <Image width="40" height="40" src={googleLogo} alt="google-logo" />
      </button>

      <button
        onClick={() => handleOAuthLogin('kakao')}
        disabled={isPending}
        className="cursor-pointer rounded-full bg-[#FEE500] p-4.5 shadow-md"
      >
        <Image width="40" height="40" src={kakaoLogo} alt="kakao-logo" />
      </button>

      <button
        onClick={() => handleOAuthLogin('github')}
        disabled={isPending}
        className="cursor-pointer rounded-full bg-[#010101] p-4.5 shadow-md"
      >
        <Image width="40" height="40" src={githubLogo} alt="github-logo" />
      </button>
    </div>
  );
};

export default SocialButton;
