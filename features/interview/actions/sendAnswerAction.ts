'use server';

import { createClient } from '@/lib/supabase/server';
import { getAiNextQuestion } from '../services/aiService';
import { AiMessageEntity } from '@/types/entity';

export interface SendAnswerParams {
  interviewId: string;
  content: string;
  categoryType: string;
}

export const sendAnswerAction = async ({
  interviewId,
  content,
  categoryType,
}: SendAnswerParams) => {
  const supabase = await createClient();

  const { data: history } = await supabase
    .from('ai_message')
    .select('*')
    .eq('interview_id', interviewId)
    .order('created_at', { ascending: false })
    .limit(10);

  const { error: userMsgError } = await supabase.from('ai_message').insert({
    interview_id: interviewId,
    chat_role: 'user',
    content: content,
  });
  if (userMsgError) throw new Error('유저 답변 저장 실패');

  const aiContent = await getAiNextQuestion(
    content,
    categoryType,
    (history as AiMessageEntity[]) || [],
  );

  const { data: aiMessage, error: aiMsgError } = await supabase
    .from('ai_message')
    .insert({
      interview_id: interviewId,
      chat_role: 'pickbot',
      content: aiContent,
    })
    .select()
    .single();
  if (aiMsgError) throw new Error('AI 답변 저장 실패');

  return aiMessage;
};
