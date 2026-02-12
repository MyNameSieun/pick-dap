'use server';

import { createClient } from '@/lib/supabase/server';

interface UpdateAnswerQuestionProps {
  id: string;
  answer: string;
}

export const updateAnswerQuestion = async (
  answers: Partial<UpdateAnswerQuestionProps> & { id: string },
) => {
  const supabase = await createClient();

  // answers 테이블 수정
  const { data, error: aError } = await supabase
    .from('answers')
    .update({
      answer: answers.answer,
      updated_at: new Date().toISOString(),
    })
    .eq('id', answers.id)
    .select('*')
    .maybeSingle();

  if (aError) {
    throw new Error('answer 테이블 수정 중 에러가 발생했습니다');
  }

  return data;
};
