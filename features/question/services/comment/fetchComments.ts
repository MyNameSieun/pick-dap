'use server';
import { createClient } from '@/lib/supabase/server';

export const fetchComments = async (
  answerId: string,
  currentUserId?: string,
) => {
  const supabase = await createClient();

  const { data: comments, error: cError } = await supabase
    .from('comments')
    .select(
      `
      *,
      author:profiles!user_id (nickname, avatar_url) 
    `,
    )
    .eq('answer_id', answerId)
    .order('group_id', { ascending: false, nullsFirst: false });
  if (cError) {
    throw new Error('답변을 조회하는 중 오류가 발생했습니다.');
  }
  const sortedComments = comments?.sort((a, b) => {
    // 1. 내가 쓴 글인지 확인
    const aIsMine = a.user_id === currentUserId;
    const bIsMine = b.user_id === currentUserId;

    // 내가 쓴 글을 위로(-1)
    if (aIsMine !== bIsMine) {
      return aIsMine ? -1 : 1;
    }

    // 2. 그룹 정렬
    // 부모와 자식을 같은 UUID로 묶음
    const aGroup = a.group_id || a.id;
    const bGroup = b.group_id || b.id;

    // 그룹이 다르면 최신순(내림차순)
    if (aGroup !== bGroup) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    //  같은 그룹 내에서는 작성순(오름차순)
    // 무조건 먼저 쓴 부모가 위로 가도록 오름차순 정렬
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  return sortedComments;
};
