'use server';

import { createClient } from '@/lib/supabase/server';

const ANSWER_JOIN_DATA = `
*,
author:profiles(*),
question:questions!inner(*)
`;

// 리스트 조회
export const fetchAnswerQuestion = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// 단일 조회
export const fetchAnswerQuestionById = async (
  questionId: string,
  userId: string,
) => {
  const supabase = await createClient();

  // answer 조회
  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA) // 또는 join 문제 있으면 먼저 select('*')
    .eq('user_id', userId)
    .eq('question_id', questionId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('fetchAnswerById error', error.message);
    throw new Error('단일 조회 에러');
  }
  return data?.[0] ?? null;
};
