'use server';
import { createClient } from '@/lib/supabase/server';

interface initital {
  parent_id?: string | null;
  content: string;
}

// 질문 게시글 댓글용 타입
interface PostCommentInsert extends initital {
  post_id: string;
  answer_id?: null;
}

// 답변 댓글용 타입
interface AnswerCommentInsert extends initital {
  post_id?: null;
  answer_id: string;
}

export type CommentInsertPayload = PostCommentInsert | AnswerCommentInsert;

export const createComment = async ({
  post_id,
  answer_id,
  parent_id,
  content,
}: CommentInsertPayload) => {
  const supabase = await createClient();

  // 사용자 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 답글 기능 구현
  // user_id는 DB 기본값 auth.uid()가 자동으로 채워줌
  // sort_order, depth는 DB 트리거가 자동으로 채워줌
  const { data: comment, error: cError } = await supabase
    .from('comments')
    .insert({
      content,
      answer_id,
      parent_id: parent_id || null, // 루트 댓글인 경우 반드시 null이어야 트리거 작동
      post_id,
      depth: 0, // 트리거가 덮어씌울 가짜 값
      sort_order: '', // 트리거가 덮어씌울 가짜 값
    })
    .select()
    .single();

  if (cError) {
    throw new Error('답글을 생성하는 중 오류가 발생했습니다.');
  }

  return comment;
};
