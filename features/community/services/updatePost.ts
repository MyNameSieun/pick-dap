'use server';

import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

interface UpdatePostParams {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  category_id: string;
}

const QUERY_JOIN_DATA = `
      *,
      profiles (nickname, avatar_url),
      post_category (name, slug)
    `;

const updateQuery = supabase.from('post').select(QUERY_JOIN_DATA).single();
export type UpdatedPost = QueryData<typeof updateQuery>;

export const updatePost = async ({
  id,
  title,
  content,
  image_urls,
  category_id,
}: UpdatePostParams): Promise<UpdatedPost> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw new Error('인증 정보를 불러오는데 실패했습니다.');

  const newSlug = generateSlug(title);
  const { data, error: pError } = await supabase
    .from('post')
    .update({
      title,
      content,
      image_urls,
      category_id,
      slug: newSlug,
    })
    .eq('id', id)
    .select(QUERY_JOIN_DATA)
    .single();

  if (pError) {
    console.error('Update failed:', pError.message);
    throw new Error(pError.message ?? '수정 중 오류가 발생했습니다.');
  }

  return data as UpdatedPost;
};
