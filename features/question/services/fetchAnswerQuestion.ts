'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

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

// 단일 조회 (내가 쓴 답변 찾기)
export const fetchAnswerQuestionById = async (
  questionId: string,
  userId: string,
) => {
  if (!userId) return null;

  const supabase = await createClient();

  // answer 조회
  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('user_id', userId)
    .eq('question_id', questionId)
    .order('created_at', { ascending: false })
    .maybeSingle(); // 데이터가 없으면 null, 있으면 1개 객체 반환

  if (error) {
    console.error('fetchAnswerById error', error.message);
    throw new Error('단일 조회 에러');
  }

  return data;
};

//  타입 추출을 위한 쿼리 객체 (실제로 실행하지는 않고 타입 참조용으로만 사용)
const answerQuery = supabase.from('answers').select(ANSWER_JOIN_DATA);

export type AnswerQuestionJoinType = QueryData<typeof answerQuery>[number];

// 해당 질문에 대한 댓글 조회
export const fetchAnswerForQuestion = async (
  questionId: string,
  myUserId?: string,
) => {
  const supabase = await createClient();

  let query = supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('question_id', questionId);

  if (myUserId) {
    query = query.neq('user_id', myUserId);
  }

  const { data, error } = await query.order('created_at', {
    ascending: false,
  });

  // 내 ID가 있다면, 리스트에서 내 답변은 제외

  if (error) throw error;
  return data;
};
