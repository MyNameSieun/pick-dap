// features/question/services/comment/createComment.ts

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

  // 1. 유저 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 2. 기본값 설정
  let depth = 0;
  let group_id: string | null = null;
  let root_user_id: string;
  let root_created_at: string;

  /**
   * 3. 대댓글인 경우 (parent_id가 있음)
   */
  if (parent_id) {
    const { data: parent, error } = await supabase
      .from('comments')
      .select('id, group_id, depth, root_user_id, root_created_at')
      .eq('id', parent_id)
      .single();

    if (error || !parent) {
      throw new Error('부모 댓글을 찾을 수 없습니다.');
    }
    // 부모의 group_id가 있으면 상속, 없으면 부모가 루트이므로 부모의 id가 그룹의 중심이 됨
    group_id = parent.group_id || parent.id;
    // 시각적 4계층 제한 (최대 depth 3)
    // 부모가 depth 2라면 자식은 3이 되고, 부모가 3(마지막 계층)이면 자식도 3으로 유지
    depth = parent.depth + 1;
    // root 상속
    root_user_id = parent.root_user_id;
    root_created_at = parent.root_created_at;
  } else {
    /**
     * 4. 부모 댓글인 경우
     */
    root_user_id = user.id;
    root_created_at = new Date().toISOString();
  }

  // 5. 댓글 테이블 삽입
  const { data: comment, error: cError } = await supabase
    .from('comments')
    .insert({
      content,
      answer_id,
      post_id,
      parent_id,
      group_id,
      depth,
      root_user_id,
      root_created_at,
    })
    .select(
      `
    *,
    author:profiles(id, nickname, avatar_url)
  `,
    ) // 작성자 정보를 조인해서 가져옴
    .single();

  if (cError) {
    throw new Error('답글을 생성하는 중 오류가 발생했습니다.');
  }

  //  6. 부모 댓글이면 group_id = 자기 id
  if (!group_id) {
    await supabase
      .from('comments')
      .update({ group_id: comment.id })
      .eq('id', comment.id);

    // 리턴할 객체에도 반영
    comment.group_id = comment.id;
  }

  return comment;
};
