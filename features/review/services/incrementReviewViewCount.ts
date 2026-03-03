// features/review/serviews/incrementReviewViewCount.ts

'use server';

import { createClient } from '@/lib/supabase/server';

export const incrementReviewViewCount = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_review_view', {
    target_id: id,
  });

  if (error) console.error('조회수 증가 실패:', error);

  return id;
};
