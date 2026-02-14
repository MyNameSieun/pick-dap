'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const ANSWER_JOIN_DATA = `
*,
author:profiles(*),
question:questions!inner(*)
`;

// 특정 질문에 대한 모든 답변 조회
export const fetchAnswers = async (questionId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('question_id', questionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// 단일 조회 (나의 답변)
export const fetchMyAnswerData = async (questionId: string, userId: string) => {
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
