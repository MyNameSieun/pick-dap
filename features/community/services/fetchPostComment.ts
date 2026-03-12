'use server';
import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const COMMENT_JOIN_DATA = `
      *,
      author:profiles!user_id (nickname, avatar_url),
      myLiked:like!comment_id (*),
      likes_count:like!comment_id(count)
`;

const commentsJoinQuery = supabase.from('comments').select(COMMENT_JOIN_DATA);
export type RawCommentPostJoined = QueryData<typeof commentsJoinQuery>[number];

export type CommentPostEntity = RawCommentPostJoined & {
  isLiked: boolean;
  like_count: number;
};

const mapToCommentDetail = (c: RawCommentPostJoined): CommentPostEntity => ({
  ...c,
  like_count: c.likes_count?.[0]?.count ?? 0,
  isLiked: c.myLiked && c.myLiked.length > 0,
});

export const fetchPostComments = async (postId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: comments, error: cError } = await supabase
    .from('comments')
    .select(COMMENT_JOIN_DATA)
    .eq('post_id', postId)
    .eq('myLiked.user_id', user?.id || '')

    .order('root_user_id', { ascending: false })
    .order('root_created_at', { ascending: false })
    .order('group_id', { ascending: false })
    .order('created_at', { ascending: true });

  if (cError) {
    throw new Error('답변을 조회하는 중 오류가 발생했습니다.');
  }
  return comments.map(mapToCommentDetail);
};
