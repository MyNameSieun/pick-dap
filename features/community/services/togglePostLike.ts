'use server';

import { createClient } from '@/lib/supabase/server';

export const togglePostLike = async ({ postId }: { postId: string }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('toggle_like', {
    p_target_id: postId,
    p_type: 'post',
  });
  if (error) {
    console.error('좋아요 토글 오류:', error.message);
    throw new Error('좋아요 처리에 실패했습니다.');
  }
  return data;
};
