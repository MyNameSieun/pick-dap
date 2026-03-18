'use server';

import { createClient } from '@/lib/supabase/server';

export const fetchMessages = async (interviewId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('ai_message')
    .select('*')
    .eq('interview_id', interviewId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};
