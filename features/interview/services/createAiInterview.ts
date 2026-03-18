'use server';

import { createClient } from '@/lib/supabase/server';
import { CategoryTypeEnums } from '@/types/entity';

export interface CreateInterviewParams {
  categoryType: CategoryTypeEnums;
  questionId: string;
  initialQuestion: string;
}

export const createAiInterview = async ({
  categoryType,
  questionId,
  initialQuestion,
}: CreateInterviewParams) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data: existing } = await supabase
    .from('ai_interview')
    .select('id')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .eq('title', initialQuestion)
    .eq('status', 'IN_PROGRESS')
    .maybeSingle();

  if (existing) return existing;

  const { data: interview, error: interviewError } = await supabase
    .from('ai_interview')
    .insert({
      user_id: user.id,
      category_type: categoryType,
      question_id: questionId,
      status: 'IN_PROGRESS',
      title: initialQuestion,
    })
    .select()
    .single();

  if (interviewError) throw interviewError;

  const { error: messageError } = await supabase.from('ai_message').insert({
    interview_id: interview.id,
    chat_role: 'pickbot',
    content: initialQuestion,
  });

  if (messageError) throw messageError;

  return interview;
};
