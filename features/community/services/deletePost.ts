'use server';
import { createClient } from '@/lib/supabase/server';

export const deletePost = async (postId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('post')
    .delete()
    .eq('id', postId)
    .select('post_category(slug)')
    .single();

  if (error) {
    throw new Error('삭제 중 오류가 발생했습니다.');
  }

  return data.post_category?.slug;
};
