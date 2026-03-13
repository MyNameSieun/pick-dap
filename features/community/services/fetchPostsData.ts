'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
      *,
      profiles (nickname, avatar_url),
      post_category!inner (name, slug),
      myLiked: like!post_id (*),
      likes:like!post_id (count),
      comments:comments!post_id (count)
    `;

export type PostFilterOptions = {
  categorySlug?: string;
  sort?: 'latest' | 'likes' | 'views';
  searchQuery?: string;
};

const postJoinQuery = supabase.from('post').select(QUERY_JOIN_DATA);
export type RawPostJoined = QueryData<typeof postJoinQuery>[number];

export const fetchPostsData = async ({
  categorySlug,
  sort = 'latest',
  searchQuery,
}: PostFilterOptions) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase.from('post').select(QUERY_JOIN_DATA);
  if (user?.id) {
    query = query.eq('myLiked.user_id', user.id);
  }
  if (categorySlug && categorySlug !== 'all') {
    query = query.eq('post_category.slug', decodeURIComponent(categorySlug));
  }
  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`,
    );
  }

  if (sort === 'views') {
    query = query.order('view_count', { ascending: false });
  } else if (sort === 'likes') {
    query = query.order('bookmark_count', { ascending: false });
  } else {
    query = query.order('create_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data.map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    isLiked: post.myLiked && post.myLiked.length > 0,
    comment_count: post.comments?.[0]?.count ?? 0,
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
    .eq('myLiked.user_id', userId || '00000000-0000-0000-0000-000000000000')
    .eq('slug', decodeURIComponent(postSlug))
    .eq('post_category.slug', decodeURIComponent(categorySlug))
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    ...data,
    like_count: data.likes?.[0]?.count ?? 0,
    isLiked: data.myLiked && data.myLiked.length > 0,
    comment_count: data.comments?.[0]?.count ?? 0,
  };
};
const postQuery = supabase.from('post').select(QUERY_JOIN_DATA);
export type PostWithJoin = QueryData<typeof postQuery>[number];
export type mapToPostDetail = RawPostJoined & {
  isLiked: boolean;
  like_count: number;
  comment_count: number;
};
