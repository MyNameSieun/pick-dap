'use server';

import { createClient } from '@/lib/supabase/server';

export const incrementPostViewCount = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_post_view', {
    target_id: id,
  });

  if (error) console.error('조회수 증가 실패:', error);

  return id;
};
