'use server';

import { createClient } from '@/lib/supabase/server';

// 특정 AI 면접의 상세 정보 조회
export const fetchAiInterview = async (interviewId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ai_interview')
    .select('*')
    .eq('id', interviewId)
    .single();

  if (error) throw new Error(`데이터 조회 실패: ${error.message}`);
  return data;
};

// 로그인한 사용자의 모든 AI 면접 목록 조회
export const fetchMyAiInterviews = async ({
  from,
  to,
}: {
  from: number;
  to: number;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) throw new Error('회원 정보를 조회할 수 없습니다.');

  const { data, error } = await supabase
    .from('ai_interview')
    .select('*, profiles(nickname,avatar_url)')
    .eq('user_id', user.id)
    .range(from, to);

  if (error)
    throw new Error(
      `면접 목록을 불러오는 중 에러가 발생했습니다.: ${error.message}`,
    );
  return data;
};
