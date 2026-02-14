'use server';
import { createClient } from '@/lib/supabase/server';

interface createAnswerProps {
  questionIdx: number;
  answers: string;
}

export const createAnswer = async ({
  answers,
  questionIdx,
}: createAnswerProps) => {
  const supabase = await createClient();

  // 사용자 정보 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 일치하는 idx를 가진 question id 조회
  const { data: question, error: qError } = await supabase
    .from('questions')
    .select('id')
    .eq('idx', questionIdx)
    .single();

  if (qError || !question) {
    throw new Error('해당 질문의 UUID를 찾을 수 없습니다.');
  }
  // 답변 테이블 삽입
  const { data: answer, error: aError } = await supabase
    .from('answers')
    .insert({
      question_id: question.id,
      answer: answers,
      user_id: user.id,
    })
    .select()
    .maybeSingle();

  if (aError) {
    throw new Error('답변 등록 중 오류가 발생했습니다.');
  }

  return answer;
};
