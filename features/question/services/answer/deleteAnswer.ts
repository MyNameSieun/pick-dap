'use server';

import { createClient } from '@/lib/supabase/server';

export const deleteAnswer = async ({
  answerId,
  questionId,
  userId,
}: {
  answerId: string;
  questionId: string;
  userId: string | undefined;
}) => {
  const supabase = await createClient();

  const { error } = await supabase.from('answers').delete().eq('id', answerId);

  if (error) {
    throw new Error('답변 삭제중 오류가 발생했습니다');
  }

  return { answerId, questionId, userId };
};
