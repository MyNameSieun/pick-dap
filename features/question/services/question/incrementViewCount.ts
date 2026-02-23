// feature/question/services/question/incrementViewCount.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export const incrementViewCount = async (idx: number) => {
  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_view_count', {
    target_idx: idx,
  });

  if (error) console.error('조회수 증가 실패:', error);

  return idx;
};
