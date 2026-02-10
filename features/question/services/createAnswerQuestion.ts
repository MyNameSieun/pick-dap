'use server';
import { createClient } from '@/lib/supabase/server';

interface createAnswerQuestionProps {
  answers: string;
  questionIdx: number;
}

export const createAnswerQuestion = async ({
  answers,
  questionIdx,
}: createAnswerQuestionProps) => {
  const supabase = await createClient();

  // 사용자 아이디 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 답변 테이블 삽입
  const { data: answer, error: aError } = await supabase
    .from('answers')
    .insert({
      question_idx: questionIdx,
      answer: answers,
    });

  if (aError) {
    throw new Error('answer 테이블 삽입 중 오류가 발생했습니다.');
  }

  return answer;
};
