// feature/question/services/question/fetchQuestion.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { CategoryTypeEnums, QuestionType, StatusEnums } from '@/types/entity';
import { QueryData } from '@supabase/supabase-js';

// 1. 조인 쿼리 정의
const QUERY_JOIN_DATA = `
  *,
  author:profiles(*),
  stats:question_stats(*),
  status:question_status(status),
  category:question_category(category_type),
  is_bookmarked:bookmark!question_id(user_id),
  tags:question_tags(tag:tags(label)),
  tech_stacks:question_tech_stack(
    tech:tech_stack_id(id, name, slug)
  )
`;

// 2. 조인된 결과 데이터 타입 추론
const questionsJoinQuery = supabase.from('questions').select(QUERY_JOIN_DATA); // questions 기준 JOIN select 쿼리 정의(타입 추론용)
export type RawQuestionJoined = QueryData<typeof questionsJoinQuery>[number]; // 해당 쿼리 결과 배열의 요소(질문 1개) 타입 추출

// UI에서 사용할 최종 타입
export type QuestionWithDetails = RawQuestionJoined & {
  total_bookmark_count: number;
  is_mine_bookmarked: boolean;
  current_status: StatusEnums;
};

// DB 조인 결과를 화면에서 사용하기 위한 형태로 가공
const mapToQuestionDetail = (q: RawQuestionJoined): QuestionWithDetails => ({
  ...q,
  total_bookmark_count: q.stats?.bookmark_count || 0,
  is_mine_bookmarked: !!(q.is_bookmarked && q.is_bookmarked.length > 0),
  current_status: q.status?.status || 'pending',
});

// 필터링 옵션 타입
export type QuestionFilterOptions = {
  type?: QuestionType; //  'pickdap' | 'user'
  category?: CategoryTypeEnums | 'ALL';
  tag?: string;
  techs?: string;
  // '전체' 조회를 위해 'ALL' 리터럴과 Enum 타입을 합침
  status?: 'ALL' | StatusEnums;
  searchQuery?: string;
  sort?: 'latest' | 'popular';
};

// 3. 실제 데이터를 가져오는 함수
/**
 *  전체 목록 조회
 */
export const fetchQuestions = async ({
  type,
  category,
  techs,
  status,
  searchQuery,
  sort = 'popular', // 정렬 기본값
}: QuestionFilterOptions = {}) => {
  const supabase = await createClient();

  // 필터 활성화 여부 확인
  const hasCategory = category && category !== 'ALL';
  const hasStatus = status && status !== 'ALL';

  const DYNAMIC_QUERY_DATA = `
  *,
  author:profiles(*),
  stats:question_stats(*),
  status:question_status${hasStatus ? '!inner' : ''}(status), 
  category:question_category${hasCategory ? '!inner' : ''}(category_type),
  is_bookmarked:bookmark!question_id(user_id),
  tags:question_tags(tag:tags(label)),
  tech_stacks:question_tech_stack(
    tech:tech_stack_id(id, name, slug)
  )
`;
  //  필터링 시작 - 태그 존재 여부에 따라 조인 방식 결정
  let query = supabase.from('questions').select(DYNAMIC_QUERY_DATA);

  // --- 필터링 로직 ---
  // 1. 기술 스택 필터링 로직
  if (techs) {
    const techArray = techs.split(',');

    const { data: filteredQuestions, error } = await supabase.rpc(
      'get_questions_with_all_techs',
      { tech_slugs: techArray },
    );

    if (error) throw error;

    const ids = filteredQuestions.map((q) => q.id);

    query = query.in('id', ids);
  }
  // 2. 질문 출처 필터
  if (type) {
    query = query.eq('question_type', type);
  }

  // 3. 직무 분야 필터
  if (category && category !== 'ALL') {
    query = query.eq('question_category.category_type', category);
  }

  // 4. 상태 필터
  if (status && status !== 'ALL') {
    query = query.eq('question_status.status', status);
  }

  // 5. 제목 검색
  // ilike: 대소문자를 구분하지 않고, 특정 문자가 포함된 데이터를 찾을 때 사용
  // % (와일드카드): 검색어 앞뒤에 어떤 글자가 붙어있어도 상관없이, 단어가 포함만 되어있다면 가져옴 (부분 일치 검색)
  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  // --- 정렬 로직 ---
  if (sort === 'popular') {
    // 조인된 stats 테이블의 bookmark_count 기준 정렬
    query = query.order('bookmark_count', {
      referencedTable: 'question_stats',
      ascending: false,
    });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data as unknown as RawQuestionJoined[]).map(mapToQuestionDetail);
};

/**
 *  단건 상세 조회
 */
export const fetchQuestionByIdx = async (idx: number) => {
  const supabase = await createClient();

  // 로그인한 나의 정보를 가져와서, 내가 북마크를 눌렀는지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase.from('questions').select(QUERY_JOIN_DATA).eq('idx', idx);

  if (user?.id) {
    query = query.eq('is_bookmarked.user_id', user.id);
  }

  const { data, error } = await query.single();
  if (error) throw error;

  return mapToQuestionDetail(data);
};

/**
 * 내 마이페이지용: 현재 로그인한 세션의 질문만 조회
 * userId를 인자로 받지 않아 보안상 안전
 */
export const fetchMyQuestions = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('questions')
    .select(QUERY_JOIN_DATA)
    .eq('author_id', user.id) // 서버에서 가져온 유저 ID 사용
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(mapToQuestionDetail);
};

/**
 * 타인 프로필용: 특정 유저의 질문 목록 조회
 * 공개된 프로필 페이지 등에서 사용
 */
export const fetchUserQuestions = async (userId: string) => {
  const supabase = await createClient();

  // 로그인한 나의 정보를 가져와서, 타인의 답변에 내가 북마크를 눌렀는지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('questions')
    .select(QUERY_JOIN_DATA)
    .eq('author_id', userId)
    .order('created_at', { ascending: false });

  if (user?.id) {
    query = query.eq('is_bookmarked.user_id', user.id);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map(mapToQuestionDetail);
};
