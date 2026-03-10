'use server';

import { createClient } from '@/lib/supabase/server';

export const deleteProject = async (slug: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('인증되지 않은 사용자입니다.');
  const decodedSlug = decodeURIComponent(slug);

  const { error } = await supabase
    .from('project')
    .delete()
    .eq('slug', decodedSlug)
    .eq('user_id', user.id);

  if (error) throw new Error();

  return slug;
};
