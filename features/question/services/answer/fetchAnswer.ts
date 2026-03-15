// features/question/services/answer/fetchAnswer.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

// 1. 조인 쿼리 정의
const ANSWER_JOIN_DATA = `
    *,
    author:profiles(*),
    question:questions!inner(*),
    myLiked:like!answer_id (*),
    likes:like!answer_id (count)
  `;

// 2. 조인된 결과 데이터 타입 추론
const answerJoinQuery = supabase.from('answers').select(ANSWER_JOIN_DATA);
export type RawAnswerJoined = QueryData<typeof answerJoinQuery>[number];

// UI에서 사용할 최종 타입
export type AnswerEntity = RawAnswerJoined & {
  isLiked: boolean;
  like_count: number;
};

// DB 조인 결과를 화면에서 사용하기 위한 형태로 가공
const mapToAnswerDetail = (answer: RawAnswerJoined): AnswerEntity => ({
  ...answer,
  like_count: answer.likes?.[0]?.count ?? 0,
  isLiked: answer.myLiked?.length > 0,
});

// 3. 실제 데이터를 가져오는 함수
/**
 *  * 특정 질문에 대한 모든 답변 리스트 조회
 */

export const fetchAnswers = async (questionId: string) => {
  const supabase = await createClient();

  // 로그인한 나의 정보를 가져와서, 내가 좋아요를 눌렀는지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('question_id', questionId)
    .order('created_at', { ascending: false });

  if (user?.id) {
    query = query.eq('myLiked.user_id', user.id);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data) return [];

  return data.map(mapToAnswerDetail);
};

/**
 *  * 내가 작성한 단일 답변 조회
 */
export const fetchMySingleAnswer = async (questionId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return null;

  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('question_id', questionId)
    .eq('user_id', user.id)
    .eq('myLiked.user_id', user?.id)
    .maybeSingle(); // 데이터가 없어도 에러를 내지 않고 null을 반환

  if (error) {
    console.error('fetchMyAnswerData error', error.message);
    throw new Error('단일 조회 에러');
  }

  if (!data) return null;

  return mapToAnswerDetail(data);
};

/**
 * 내가 작성한 모든 답변 조회 (마이페이지용)
 */
export const fetchMyAnswers = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('user_id', user.id) // 내 답변만 필터링
    .eq('myLiked.user_id', user.id) // 내 좋아요 여부 확인용 필터
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!data) return [];

  return data.map(mapToAnswerDetail);
};

/**
 * 특정 유저가 작성한 모든 답변 목록 조회 (타인 프로필용)
 */
export const fetchUserAnswers = async (userId: string) => {
  const supabase = await createClient();

  // 로그인한 나의 정보를 가져와서, 타인의 답변에 내가 좋아요를 눌렀는지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('answers')
    .select(ANSWER_JOIN_DATA)
    .eq('user_id', userId) // 인자로 받은 상대방의 ID
    .order('created_at', { ascending: false });

  if (user?.id) {
    query = query.eq('myLiked.user_id', user.id);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map(mapToAnswerDetail);
};
