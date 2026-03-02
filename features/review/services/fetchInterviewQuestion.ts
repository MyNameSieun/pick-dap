'use server';

import { createClient } from '@/lib/supabase/server';

export const fetchInterviewQuestion = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('interview_question').select();

  if (error) throw new Error(error.message);

  return data;
};
