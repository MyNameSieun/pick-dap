'use server';

import { createClient } from '@/lib/supabase/server';

export const fetchJobRole = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('job_role').select();

  if (error) throw new Error('데이터를 가져오는데 실패했습니다.');
  return data;
};
