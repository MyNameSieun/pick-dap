'use server';

import { createClient } from '@/lib/supabase/server';

export const fetchCategories = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('post_category')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
