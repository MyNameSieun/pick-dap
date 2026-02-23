// features/question/services/answer/createAnswer.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

interface createAnswerProps {
  questionId: string;
  answers: string;
  currentPath: string;
}

export const createAnswer = async ({
  answers,
  questionId,
  currentPath,
}: createAnswerProps) => {
  const supabase = await createClient();

  // 현재 로그인 사용자 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/login?returnTo=${encodeURIComponent(currentPath)}`);
  }

  // 답변 테이블 삽입
  const { error: aError } = await supabase
    .from('answers')
    .insert({
      question_id: questionId,
      answer: answers,
      user_id: user.id,
    })
    .select()
    .maybeSingle();

  if (aError) {
    throw new Error('답변 등록 중 오류가 발생했습니다.');
  }

  // 상태 변경
  const { error: updateError } = await supabase
    .from('question_status')
    .update({ status: 'completed' })
    .eq('question_id', questionId)
    .eq('user_id', user.id);

  if (updateError) {
    console.error('상태 업데이트 실패:', updateError);
  }

  return questionId;
};
