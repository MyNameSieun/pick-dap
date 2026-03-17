// feature/question/services/question/fetchQuestion.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { CategoryTypeEnums, QuestionType, StatusEnums } from '@/types/entity';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
  *,
  author:profiles!user_id(*),
  stats:question_stats(*),
  status:question_status(status),
  category:question_category(category_type),
  is_bookmarked:bookmark!question_id(user_id),
  tags:question_tags(tag:tags(label)),
  tech_stacks:question_tech_stack(
    tech:tech_stack_id(id, name, slug)
  )
`;

const questionsJoinQuery = supabase.from('questions').select(QUERY_JOIN_DATA);
export type RawQuestionJoined = QueryData<typeof questionsJoinQuery>[number];

export type QuestionWithDetails = RawQuestionJoined & {
  total_bookmark_count: number;
  is_mine_bookmarked: boolean;
  current_status: StatusEnums;
};

const mapToQuestionDetail = (q: RawQuestionJoined): QuestionWithDetails => {
  const statusData = Array.isArray(q.status) ? q.status[0] : q.status;

  return {
    ...q,
    total_bookmark_count: q.stats?.bookmark_count || 0,
    is_mine_bookmarked: !!(q.is_bookmarked && q.is_bookmarked.length > 0),
    current_status: (statusData?.status as StatusEnums) || 'pending',
  };
};
export type QuestionFilterOptions = {
  category?: CategoryTypeEnums | 'ALL';
  techs?: string;
  sort?: 'latest' | 'popular';
  type?: QuestionType;
  status?: StatusEnums | 'ALL';
  searchQuery?: string;
  view?: 'ALL' | 'my';
};

/**
 *  * 전체 목록 조회
 */
export const fetchQuestions = async ({
  category,
  techs,
  sort = 'popular',
  type,
  status,
  searchQuery,
  view,
}: QuestionFilterOptions = {}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasCategory = category && category !== 'ALL';
  const hasStatus = status && status !== 'ALL';

  const DYNAMIC_QUERY_DATA = `
    *,
    author:profiles!user_id(*),
    stats:question_stats(*),
    status:question_status${hasStatus ? '!inner' : ''}(status), 
    category:question_category${hasCategory ? '!inner' : ''}(category_type),
    is_bookmarked:bookmark!question_id(user_id), 
    tags:question_tags(tag:tags(label)),
    tech_stacks:question_tech_stack(
      tech:tech_stack_id(id, name, slug)
    )
  `;

  let query = supabase.from('questions').select(DYNAMIC_QUERY_DATA);

  if (user) {
    query = query.eq('is_bookmarked.user_id', user.id);
  } else {
    query = query.eq(
      'is_bookmarked.user_id',
      '00000000-0000-0000-0000-000000000000',
    );
  }
  if (view && view != 'ALL') {
    if (!user?.id) return;
    query = query.eq('user_id', user?.id);
  }
  if (type) {
    query = query.eq('question_type', type);
  }

  if (category && category !== 'ALL') {
    query = query.eq('question_category.category_type', category);
  }

  if (status && status !== 'ALL') {
    query = query.eq('question_status.status', status);
  }

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

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

  if (sort === 'popular') {
    query = query
      .order('stats(bookmark_count)', { ascending: false })
      .order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data as unknown as RawQuestionJoined[]).map(mapToQuestionDetail);
};

/**
 *  * 단건 상세 조회
 */
export const fetchQuestionByIdx = async (idx: number) => {
  const supabase = await createClient();

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
 * * 내 마이페이지용: 현재 로그인한 세션의 질문만 조회
 * userId를 인자로 받지 않아 보안상 안전
 */
export const fetchMyQuestions = async (filters: QuestionFilterOptions = {}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const hasCategory = filters.category && filters.category !== 'ALL';
  const hasStatus = filters.status && filters.status !== 'ALL';

  const DYNAMIC_QUERY_DATA = `
    *,
    author:profiles!user_id(*),
    stats:question_stats(*),
    status:question_status${hasStatus ? '!inner' : ''}(status), 
    category:question_category${hasCategory ? '!inner' : ''}(category_type),
    is_bookmarked:bookmark!question_id(user_id),
    tags:question_tags(tag:tags(label)),
    tech_stacks:question_tech_stack(
      tech:tech_stack_id(id, name, slug)
    )
  `;

  let query = supabase.from('questions').select(DYNAMIC_QUERY_DATA);

  // 작성자 본인의 데이터만 가져오도록 필터
  query = query.eq('user_id', user.id);

  if (filters.type) query = query.eq('question_type', filters.type);
  if (hasCategory)
    query = query.eq(
      'question_category.category_type',
      filters.category as CategoryTypeEnums,
    );

  if (filters.view && filters.view != 'ALL') {
    if (!user?.id) return;
    console.log('view: ', filters.view);
    query = query.eq('user_id', user?.id);
  }

  if (hasStatus)
    query = query.eq('question_status.status', filters.status as StatusEnums);
  if (filters.searchQuery)
    query = query.ilike('title', `%${filters.searchQuery}%`);

  if (filters.sort === 'popular') {
    query = query
      .order('stats(bookmark_count)', { ascending: false })
      .order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data as unknown as RawQuestionJoined[]).map(mapToQuestionDetail);
};

// * 내가 저장한 질문
export const fetchMySaveQuestions = async (
  filters: QuestionFilterOptions = {},
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const hasCategory = filters.category && filters.category !== 'ALL';
  const hasStatus = filters.status && filters.status !== 'ALL';

  const DYNAMIC_QUERY_DATA = `
    *,
    author:profiles!user_id(*),
    stats:question_stats(*),
    status:question_status${hasStatus ? '!inner' : ''}(status), 
    category:question_category${hasCategory ? '!inner' : ''}(category_type),
    is_bookmarked:bookmark!inner(user_id),
    tags:question_tags(tag:tags(label)),
    tech_stacks:question_tech_stack(
      tech:tech_stack_id(id, name, slug)
    )
  `;

  let query = supabase.from('questions').select(DYNAMIC_QUERY_DATA);

  query = query.eq('is_bookmarked.user_id', user.id);

  if (filters.type) query = query.eq('question_type', filters.type);
  if (hasCategory)
    query = query.eq(
      'question_category.category_type',
      filters.category as CategoryTypeEnums,
    );
  if (filters.view && filters.view != 'ALL') {
    if (!user?.id) return;
    console.log('view: ', filters.view);
    query = query.eq('user_id', user?.id);
  }
  if (hasStatus)
    query = query.eq('question_status.status', filters.status as StatusEnums);
  if (filters.searchQuery)
    query = query.ilike('title', `%${filters.searchQuery}%`);

  if (filters.sort === 'popular') {
    query = query
      .order('stats(bookmark_count)', { ascending: false })
      .order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (filters.techs) {
    const techArray = filters.techs.split(',');

    const { data: filteredQuestions, error: rpcError } = await supabase.rpc(
      'get_questions_with_all_techs',
      { tech_slugs: techArray },
    );

    if (rpcError) throw rpcError;

    const ids = filteredQuestions.map((q) => q.id);
    query = query.in('id', ids);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data as unknown as RawQuestionJoined[]).map(mapToQuestionDetail);
};

/**
 * * 타인 프로필용: 특정 유저의 질문 목록 조회
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
