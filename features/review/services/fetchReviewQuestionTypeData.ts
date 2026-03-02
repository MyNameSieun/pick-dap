'use server';

import { createClient } from '@/lib/supabase/server';

export const reviewQuestionTypeData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('review_question_type')
    .select()
    .order('display_order', { ascending: true });

  if (error) throw new Error('데이터를 가져오는데 실패하였습니다.');

  return data;
};
