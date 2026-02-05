// service/auth.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { SignupFormData } from '@/types/schema';

// Email 회원가입
export const signUp = async ({
  email,
  password,
  nickname,
}: Omit<SignupFormData, 'confirmPassword'>) => {
  const supabase = await createClient();

  // 닉네임 중복 체크
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle(); // 데이터가 없으면 에러 말고 null을 줌

  if (existingUser) {
    throw new Error('이미 사용 중인 닉네임입니다.');
  }

  // 회원가입 실행
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname: nickname },
    },
  });

  if (error) {
    throw new Error(error.code);
  }
  return data;
};

// Email 로그인
export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
  return data;
};
