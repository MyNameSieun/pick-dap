import { supabase } from '@/lib/supabase/supabase';

export const fetchTechStacks = async () => {
  const { data, error } = await supabase
    .from('tech_stack')
    .select('id, name, slug')
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
};
