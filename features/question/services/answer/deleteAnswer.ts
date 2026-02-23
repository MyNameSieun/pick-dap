'use server';

import { createClient } from '@/lib/supabase/server';

export const deleteAnswer = async ({
  answerId,
  questionId,
}: {
  answerId: string;
  questionId: string;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { error } = await supabase.from('answers').delete().eq('id', answerId);
  if (error) {
    throw new Error('답변 삭제중 오류가 발생했습니다');
  }

  // 상태 변경
  const { error: updateError } = await supabase
    .from('question_status')
    .update({ status: 'pending' })
    .eq('question_id', questionId);

  if (updateError) {
    console.error('상태 업데이트 실패:', updateError);
  }
  return { answerId, questionId };
};
