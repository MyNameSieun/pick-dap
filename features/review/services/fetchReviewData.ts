'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import {
  EmploymentType,
  FinalStatusType,
  InterviewProcessEntity,
  InterviewSeasonType,
  JobRoleEntity,
} from '@/types/entity';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
    *,
    job_role:job_role(name),
    interview_question (*),
    processes:review_process_map(process:interview_processes(*)),
    review_questions:review_question_type_map(question_type:review_question_type(*)),
    myLiked:like!review_id (user_id),
    likes:like!review_id(count)
`;

// 필터링 옵션 타입
export type ReviewFilterOptions = {
  finalStatusType?: FinalStatusType | 'ALL';
  interviewSeason?: InterviewSeasonType | 'ALL';
  interviewYear?: number | 'ALL';
  employmentType?: EmploymentType | 'ALL';
  jobRole?: string | 'ALL';
  interviewProcesses?: string | 'ALL';
  searchQuery?: string;
};

// 리뷰 목록
export const fetchReviewsData = async ({
  finalStatusType,
  interviewSeason,
  interviewYear,
  employmentType,
  searchQuery,
  jobRole,
  interviewProcesses,
}: ReviewFilterOptions = {}) => {
  const supabase = await createClient();

  // 필터 활성화 여부 확인
  const hasFinalStatusType = finalStatusType && finalStatusType !== 'ALL';

  const hasInterviewSeason = interviewSeason && interviewSeason !== 'ALL';
  const hasInterviewYear = interviewYear && interviewYear !== 'ALL';

  const hasEmploymentType = employmentType && employmentType !== 'ALL';
  const hasJobRole = jobRole && jobRole !== 'ALL';
  const hasInterviewProcesses =
    interviewProcesses && interviewProcesses !== 'ALL';

  const DYNAMIC_QUERY_DATA = `
    *,
    job_role:job_role${hasJobRole ? '!inner' : ''}(name),
    interview_question (*),
    processes:review_process_map${hasInterviewProcesses ? '!inner' : ''}(process:interview_processes(*)),
    review_questions:review_question_type_map(question_type:review_question_type(*)),
    myLiked:like!review_id (user_id),
    likes:like!review_id(count)
`;

  let query = supabase.from('interview_review').select(DYNAMIC_QUERY_DATA);

  // interviewYear나 interviewSeason은 보통 부모 테이블(Review) 자체의 컬럼인 경우,
  //  쿼리 데이터 문자열을 수정할 필요 없이, 아래와 같이 .eq() 체이닝만 해주면 됨
  // 부모 테이블 필터
  if (hasFinalStatusType)
    query = query.eq('final_status_type', finalStatusType);
  if (hasInterviewYear) query = query.eq('interview_year', interviewYear);
  if (hasInterviewSeason) query = query.eq('interview_season', interviewSeason);

  if (hasEmploymentType) query = query.eq('employment_type', employmentType);

  // 자식 테이블(Inner Join) 컬럼 필터(별칭이 아닌 원본 관계명 사용해야 함)
  if (hasJobRole) query = query.eq('job_role.name', jobRole);

  if (hasInterviewProcesses) {
    // 중간 테이블을 거치는 경우 해당 테이블의 필드로 필터링
    query = query.eq(
      'review_process_map.interview_processes.name',
      interviewProcesses,
    );
  }

  if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) throw error;

  return (data as unknown as RawReviewJoined[]).map((review) => ({
    ...review,
    like_count: review.likes?.[0]?.count ?? 0,
    isLiked: review.myLiked?.length > 0,
  }));
};

// 특정 리뷰 조회
export const fetchReviewById = async (id: string, userId: string) => {
  const supabase = await createClient();

  const { data: review, error } = await supabase
    .from('interview_review')
    .select(QUERY_JOIN_DATA)
    .eq('id', id)
    .single();

  if (error) throw error;

  return {
    ...review,
    like_count: review.likes?.[0]?.count ?? 0,
    isLiked: review.myLiked && review.myLiked.length > 0,
  };
};

const reviewJoinQuery = supabase
  .from('interview_review')
  .select(QUERY_JOIN_DATA);

// 조인 결과 타입 추출
export type RawReviewJoined = QueryData<typeof reviewJoinQuery>[number];

export type mapToReviewDetail = RawReviewJoined & {
  isLiked: boolean;
  like_count: number;
};
