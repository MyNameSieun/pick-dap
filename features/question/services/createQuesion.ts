import { supabase } from '@/lib/supabase/supabase';

export const createQuesion = async (title: string) => {
  const { data, error } = await supabase
    .from('questions')
    .insert({ title: title });

  if (error) throw error;
  return data;
};
