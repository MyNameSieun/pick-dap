import { supabase } from '@/lib/supabase/supabase';
import {
  CategoryTypeEnums,
  QuestionStatus,
  QuestionType,
} from '@/types/entity';
import { QueryData } from '@supabase/supabase-js';

// 1. 공통 조인 쿼리 정의 (is_bookmarked 추가)
export const QUERY_JOIN = `
  *,
  author:profiles(*),
  stats:question_stats(*),
  tags:question_tags(tag:tags(label)),
  tech_stacks:question_tech_stack(
    tech:tech_stack_id(id, name, slug)
  ),
  category:question_category(category_type),
  is_bookmarked:bookmark!question_id(user_id)
`;

// 2. 타입 정의 (추론 기반)
const questionsQuery = supabase.from('questions').select(QUERY_JOIN);
export type RawQuestionData = QueryData<typeof questionsQuery>[number];

// 최종적으로 UI에서 사용할 데이터 타입
export type QuestionWithDetails = RawQuestionData & {
  total_bookmark_count: number;
  is_mine_bookmarked: boolean;
};
// tech_stack_id라는 FK를 통해 tech_stack 테이블의 id, name, slug를 가져옴

// 태그 필터용 조인 쿼리 (태그가 있을 때: 해당 태그가 있는 질문만 inner join)
// !를 안 쓸 때 (기본): 질문(questions) 데이터는 무조건 가져옵니다. 설령 그 질문에 연결된 기술 스택(tech_stack)이 하나도 없더라도, 질문 정보는 화면에 나타납니다. (기술 스택 부분만 빈 배열로 표시됨)
// !를 쓸 때 (!inner): 질문에 연결된 기술 스택이 최소 하나 이상 있을 때만 그 질문을 가져옵니다. 기술 스택이 없는 질문은 아예 목록에서 사라집니다.

// 2. 필터링 옵션 타입
export type QuestionFilterOptions = {
  type?: QuestionType; //  'pickdap' | 'user'
  category?: CategoryTypeEnums | 'ALL';
  tag?: string;
  techs?: string;
  // '전체' 조회를 위해 'ALL' 리터럴과 Enum 타입을 합침
  status?: 'ALL' | QuestionStatus;
  searchQuery?: string;
  sort?: 'latest' | 'popular';
};

// 목록 조회
export const fetchQuestions = async ({
  type,
  category,
  tag,
  techs,
  status,
  searchQuery,
  sort = 'popular', // 정렬 기본값
}: QuestionFilterOptions = {}) => {
  // 필터 활성화 여부 확인
  const hasCategory = category && category !== 'ALL';
  const hasTechs = !!techs;

  const DYNAMIC_QUERY = `
  *,
  author:profiles(*),
  stats:question_stats(bookmark_count),
  is_bookmarked:bookmark(user_id),
  tags:question_tags${hasTechs ? '!inner' : ''}(
    tag:tags${hasTechs ? '!inner' : ''}(label)
  ),
  tech_stacks:question_tech_stack(
    tech:tech_stack_id(id, name, slug)
  ),
  category:question_category${hasCategory ? '!inner' : ''}(category_type)
`;

  //  필터링 시작 - 태그 존재 여부에 따라 조인 방식 결정
  let query = supabase.from('questions').select(DYNAMIC_QUERY);

  // --- 필터링 로직 ---

  // 1. 기술 스택 필터링 로직
  if (techs) {
    // URL에서 온 "c,react" 문자열을 ["c", "react"] 배열로 변환
    const techArray = techs.split(',');
    query = query.in('tags.tag.label', techArray);
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
    query = query.eq('status', status);
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

  // 3. 타입 안전한 데이터 가공
  return (data as unknown as RawQuestionData[]).map(
    (q): QuestionWithDetails => ({
      ...q,
      total_bookmark_count: q.stats?.bookmark_count || 0,
      is_mine_bookmarked: !!(q.is_bookmarked && q.is_bookmarked.length > 0),
    }),
  );
};

export type QuestionEnitiy = QueryData<typeof questionsQuery>[number];

// 상세 조회
export const fetchQuestionByIdx = async (idx: number, userId: string) => {
  const { data, error } = await supabase
    .from('questions')
    .select(QUERY_JOIN)
    .eq('idx', idx)
    .eq('is_bookmarked.user_id', userId || '')
    .single();

  if (error) throw error;
  return {
    ...data,
    total_bookmark_count: data.stats?.bookmark_count || 0,
    is_mine_bookmarked: !!(data.is_bookmarked && data.is_bookmarked.length > 0),
  };
};
