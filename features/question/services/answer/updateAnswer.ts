'use server';

import { createClient } from '@/lib/supabase/server';
import { AnswerEntity } from './fetchAnswer';

interface UpdateAnswerQuestionProps {
  id: string;
  answer: string;
}

export const updateAnswer = async (
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
    .select(
      `*,
      author:profiles!user_id (nickname, avatar_url)`,
    )
    .maybeSingle();

  if (aError) {
    throw new Error('answer 테이블 수정 중 에러가 발생했습니다');
  }

  return data as unknown as Partial<AnswerEntity>;
};
