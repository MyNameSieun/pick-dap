import { supabase } from '@/lib/supabase/supabase';

export const deleteComment = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId);

  if (error) {
    throw new Error('댓글을 삭제하는 중 오류가 발생했습니다');
  }
};
