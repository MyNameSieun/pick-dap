'use server';
import { createClient } from '@/lib/supabase/server';

export const deleteAnswerComment = async ({ commentId }: { commentId: string }) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('comments')
    .delete()
    .select('id, answer_id')
    .eq('id', commentId)
    .single();

  if (error) {
    throw new Error('댓글을 삭제하는 중 오류가 발생했습니다');
  }

  return data;
};
