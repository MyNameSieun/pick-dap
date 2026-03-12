'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
      *,
      profiles (nickname, avatar_url),
      post_category!inner (name, slug),
      myLiked: like!post_id (*),
      likes:like!post_id (count)
    `;

const postJoinQuery = supabase.from('post').select(QUERY_JOIN_DATA);
export type RawPostJoined = QueryData<typeof postJoinQuery>[number];

export const fetchPostsData = async (categorySlug?: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('post')
    .select(QUERY_JOIN_DATA)
    .eq('myLiked.user_id', user?.id || '')
    .order('create_at', { ascending: false });

  if (categorySlug) {
    query = query.eq('post_category.slug', decodeURIComponent(categorySlug));
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data.map((answer) => ({
    ...answer,
    like_count: answer.likes?.[0]?.count ?? 0,
    isLiked: answer.myLiked && answer.myLiked.length > 0,
  }));
};

export const fetchPostDetail = async (
  categorySlug: string,
  postSlug: string,
  userId?: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('post')
    .select(QUERY_JOIN_DATA)
    .eq('myLiked.user_id', userId || " ''")
    .eq('slug', decodeURIComponent(postSlug))
    .eq('post_category.slug', decodeURIComponent(categorySlug))
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    ...data,
    like_count: data.likes?.[0]?.count ?? 0,
    isLiked: data.myLiked && data.myLiked.length > 0,
  };
};
const postQuery = supabase.from('post').select(QUERY_JOIN_DATA);
export type PostWithJoin = QueryData<typeof postQuery>[number];
export type mapToPostDetail = PostWithJoin & {
  isLiked: boolean;
  like_count: number;
};
