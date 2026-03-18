'use server';

import { createClient } from '@/lib/supabase/server';

const deleteAiInterviews = async (interviewIds: string[]) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('ai_interview')
    .delete()
    .in('id', interviewIds);

  if (error) throw new Error('삭제 중 오류가 발생했습니다.');

  return interviewIds;
};

export default deleteAiInterviews;
