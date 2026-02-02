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
  const { data: existingUser, error: checkError } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle();

  //  DB 조회 자체에 에러가 발생한 경우 (예: RLS 권한 문제, 네트워크 에러 등)
  if (checkError) {
    throw new Error(
      '서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }

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
    // 이메일 중복
    if (error.code === 'user_already_exists') {
      throw new Error('이미 가입된 이메일입니다.');
    }

    // 그 외 에러 처리
    if (error.status && error.status >= 400 && error.status < 500) {
      throw new Error(error.message || '회원가입 중 오류가 발생했습니다.');
    }
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
