'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const ANSWER_JOIN_DATA = `
  *,
  author:profiles(*),
  question:questions!inner(*),
  myLiked:like!answer_id (*),
  likes:like!answer_id (count)
  `;

// 특정 질문에 대한 모든 답변 조회
export const fetchAnswers = async (questionId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('question_id', questionId)
    .eq('myLiked.user_id', user?.id || '')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map((answer) => ({
    ...answer,
    like_count: answer.likes?.[0]?.count ?? 0,
    isLiked: answer.myLiked && answer.myLiked.length > 0,
  }));
};

// 단일 조회 (나의 답변)
export const fetchMyAnswerData = async (questionId: string, userId: string) => {
  if (!userId) return null;

  const supabase = await createClient();

  // answer 조회
  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('user_id', userId) // 내가 쓴 답변인지 확인
    .eq('myLiked.user_id', userId || '') // 그 답변을 내가 좋아하는지 확인
    .eq('question_id', questionId)
    .order('created_at', { ascending: false })
    .maybeSingle(); // 데이터가 없으면 null, 있으면 1개 객체 반환

  if (error) {
    console.error('fetchAnswerById error', error.message);
    throw new Error('단일 조회 에러');
  }
  if (!data) return null;
  return {
    ...data,
    like_count: data.likes?.[0]?.count ?? 0,
    isLiked: data.myLiked && data.myLiked.length > 0,
  };
};
// 1. 서비스 함수에서 사용하는 쿼리 객체로부터 타입을 자동 추출합니다.
const answerQuery = supabase.from('answers').select(ANSWER_JOIN_DATA);
export type AnswerWithJoin = QueryData<typeof answerQuery>[number];

// 2. DB에는 없지만 UI에서 필요한 '가상 속성'들을 합쳐서 최종 엔티티를 만듭니다.
export type AnswerEntity = AnswerWithJoin & {
  isLiked: boolean; // 내가 좋아요를 눌렀는지 여부
  like_count: number; // 실시간 집계된 좋아요 수
};
