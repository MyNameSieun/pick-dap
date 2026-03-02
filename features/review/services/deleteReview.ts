'use server';

import { createClient } from '@/lib/supabase/server';

export const deleteReview = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('interview_review')
    .delete()
    .eq('id', id);

  if (error) throw new Error('리뷰 삭제 중 오류가 발생했습니다');

  return id;
};
