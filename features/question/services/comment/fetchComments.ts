// features/question/services/comment/fetchComments.ts

'use server';
import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

// 1. 조인 쿼리 정의
const COMMENT_JOIN_DATA = `
      *,
      author:profiles!user_id (nickname, avatar_url),
      myLiked:like!comment_id (*),
      likes_count:like!comment_id(count)
`;

// 2. 조인된 결과 데이터 타입 추론
const commentsJoinQuery = supabase.from('comments').select(COMMENT_JOIN_DATA); // comments 기준 JOIN select 쿼리 정의(타입 추론용)
export type RawCommentJoined = QueryData<typeof commentsJoinQuery>[number]; // 해당 쿼리 결과 배열의 요소(질문 1개) 타입 추출

// UI에서 사용할 최종 타입
export type CommentEntity = RawCommentJoined & {
  isLiked: boolean;
  like_count: number;
};

// DB 조인 결과를 화면에서 사용하기 위한 형태로 가공
const mapToCommentDetail = (c: RawCommentJoined): CommentEntity => ({
  ...c,
  like_count: c.likes_count?.[0]?.count ?? 0,
  isLiked: c.myLiked && c.myLiked.length > 0,
});

// 3. 실제 데이터를 가져오는 함수
export const fetchComments = async (answerId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: comments, error: cError } = await supabase
    .from('comments')
    .select(COMMENT_JOIN_DATA)
    .eq('answer_id', answerId)
    .eq('myLiked.user_id', user?.id || '')

    .order('root_user_id', { ascending: false }) // 내가 쓴 그룹 우선
    .order('root_created_at', { ascending: false }) // 그룹 최신순

    .order('group_id', { ascending: false }) // 그룹 묶음 유지
    .order('created_at', { ascending: true }); // 그룹 내부 작성순 (먼저 쓴 부모가 위, 대댓글은 아래로)

  if (cError) {
    throw new Error('답변을 조회하는 중 오류가 발생했습니다.');
  }
  return comments.map(mapToCommentDetail);
};
