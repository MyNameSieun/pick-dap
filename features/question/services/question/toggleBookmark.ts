'use server';
import { createClient } from '@/lib/supabase/server';

export const toggleBookmark = async ({
  questionId,
}: {
  questionId: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('toggle_bookmark', {
    p_question_id: questionId,
  });

  if (error) {
    console.error('북마크 실패:', error.message);
    throw new Error('북마크에 실패하였습니다.');
  }
  return data;
};
