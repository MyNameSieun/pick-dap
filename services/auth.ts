import { createClient } from '@/lib/supabase/client';

// 회원가입
export const signUp = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { user_name: username } },
  });
  if (error) {
    if (error.message.includes('User already registered')) {
      throw new Error('이미 가입된 이메일입니다.');
    } else if (error.message.includes('Database error saving new user')) {
      throw new Error('이미 사용 중인 닉네임입니다.');
    }

    throw new Error(`회원가입 오류: ${error.message}`);
  }

  return data;
};

// 로그인 with Password
export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`이메일 또는 비밀번호를 확인해주세요.`);
  }

  return data;
};

// 로그인 with OAuth
export const signInWithOAuth = async (
  provider: 'google' | 'github' | 'kakao',
) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  return data;
};
