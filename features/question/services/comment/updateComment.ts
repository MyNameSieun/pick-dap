'use server';
import { createClient } from '@/lib/supabase/server';

interface UpdateCommentParams {
  id: string;
  content: string;
}

export const updateComment = async (
  comment: Partial<UpdateCommentParams> & { id: string },
) => {
  const supabase = await createClient();

  const commentId = comment.id;

  const { data, error: cError } = await supabase
    .from('comments')
    .update({
      content: comment.content,
    })
    .eq('id', commentId)
    // 캐시 업데이트를 위해 상세 정보 가져오기 -> 캐시 무효화 할 거면 필요 x
    // *: comments 테이블의 모든 컬럼 가져옴
    // author:profiles: 작성자 프로필(profiles)을 author라는 이름으로 합쳐서 가져옴
    // user_id: 댓글의 user_id 컬럼을 보고 작성자를 찾아냄
    // (nickname, avatar_url): 프로필에서 닉네임이랑 사진만 골라서 가져옴
    .select(`*, author:profiles!user_id (nickname, avatar_url)`)
    .single();

  if (cError) {
    throw new Error('댓글을 수정하는 도중 오류가 발생했습니다.');
  }

  return data; // auth 정보까지 포함된 데이터 반환
};
