'use server';
import { createClient } from '@/lib/supabase/server';
import { reverse } from 'dns';

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

  // 2. 기본값 설정
  let depth = 0;
  let group_id: string | null = null;

  // 3. 답글인 경우 (parent_id가 있음) 부모 데이터 조회
  if (parent_id) {
    const { data: parent } = await supabase
      .from('comments')
      .select('id, group_id, depth')
      .eq('id', parent_id)
      .single();

    if (parent) {
      // 부모의 group_id가 있으면 상속, 없으면 부모가 루트이므로 부모의 id가 그룹의 중심이 됨
      group_id = parent.group_id || parent.id;
      // 시각적 3계층 제한 (최대 depth 2)
      depth = parent.depth >= 2 ? 2 : parent.depth + 1;
    }
  }

  // 4. 데이터 삽입
  const { data: comment, error: cError } = await supabase
    .from('comments')
    .insert({
      content,
      answer_id,
      post_id,
      parent_id,
      group_id,
      depth,
    })
    .select()
    .single();

  if (cError) {
    throw new Error('답글을 생성하는 중 오류가 발생했습니다.');
  }

  return comment;
};
