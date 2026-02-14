'use server';
import { createClient } from '@/lib/supabase/server';

export const fetchComments = async (answerId: string) => {
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
    const aGroup = a.group_id || a.id; // 부모와 자식을 같은 UUID로 묶음
    const bGroup = b.group_id || b.id;

    if (aGroup !== bGroup) {
      // 1. 그룹이 다르면 내림차순
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // 2. 가문이 같으면? (부모와 그 자식들 사이)
    // 무조건 먼저 쓴 부모가 위로 가도록 오름차순 정렬
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  return sortedComments;
};
