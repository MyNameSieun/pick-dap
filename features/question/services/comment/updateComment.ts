// features/question/services/comment/updateComment.ts
'use server';
import { createClient } from '@/lib/supabase/server';

// 1. 수정에 필요한 타입 정의
interface UpdateCommentParams {
  id: string;
  content: string;
}

export const updateComment = async (
  // 2. props로 수정에 필요한 데이터 받아오기
  comment: Partial<UpdateCommentParams> & { id: string },
) => {
  const supabase = await createClient();

  const commentId = comment.id;

  // 3. comment 테이블 수정
  const { data, error: cError } = await supabase
    .from('comments')
    .update({
      content: comment.content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', commentId)
    // 캐시 즉시 업데이트를 위한 코드 -> 쿼리 무효화 할 거면 필요 x
    .select(
      `
      *,
      author:profiles!user_id (nickname, avatar_url),
      myLiked:like!comment_id (*),
      likes_count:like!comment_id(count)
    `,
    )
    .single();

  if (cError) {
    throw new Error('댓글을 수정하는 도중 오류가 발생했습니다.');
  }

  // 닉네임, 아바타, 좋아요 정보가 모두 담긴 완성된 데이터가 리턴됨
  return data;
};
