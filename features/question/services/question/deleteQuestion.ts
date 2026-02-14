'use server';
import { createClient } from '@/lib/supabase/server';

export const deleteQuestion = async (idx: number) => {
  const supabase = await createClient();

  const { error } = await supabase.from('questions').delete().eq('idx', idx);

  if (error) {
    throw new Error('질문 삭제 중 오류가 발생했습니다.');
  }

  return idx;
};
