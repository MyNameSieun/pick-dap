'use client';
import googleLogo from '@/public/logo/goggle-logo.png';
import kakaoLogo from '@/public/logo/kakao-logo.png';
import githubLogo from '@/public/logo/github-logo.png';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

const SocialSignupButton = () => {
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex justify-center gap-6">
      <button
        onClick={handleGoogleLogin}
        className="bg-bg-light cursor-pointer rounded-full p-4.5 shadow-md"
      >
        <Image width="40" height="40" src={googleLogo} alt="google-logo" />
      </button>

      <button className="cursor-pointer rounded-full bg-[#FEE500] p-4.5 shadow-md">
        <Image width="40" height="40" src={kakaoLogo} alt="kakao-logo" />
      </button>

      <button className="cursor-pointer rounded-full bg-[#010101] p-4.5 shadow-md">
        <Image width="40" height="40" src={githubLogo} alt="github-logo" />
      </button>
    </div>
  );
};

export default SocialSignupButton;
