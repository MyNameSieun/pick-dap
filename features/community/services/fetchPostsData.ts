'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
      *,
      profiles (nickname, avatar_url),
      post_category!inner (name, slug)
    `;

const postJoinQuery = supabase.from('post').select(QUERY_JOIN_DATA);
export type RawPostJoined = QueryData<typeof postJoinQuery>[number];

export const fetchPostsData = async (categorySlug?: string) => {
  const supabase = await createClient();

  let query = supabase
    .from('post')
    .select(QUERY_JOIN_DATA)
    .order('create_at', { ascending: false });

  if (categorySlug) {
    query = query.eq('post_category.slug', decodeURIComponent(categorySlug));
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

export const fetchPostDetail = async (
  categorySlug: string,
  postSlug: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('post')
    .select(QUERY_JOIN_DATA)
    .eq('slug', decodeURIComponent(postSlug))
    .eq('post_category.slug', decodeURIComponent(categorySlug))
    .single();

  if (error) throw new Error(error.message);
  return data;
};
