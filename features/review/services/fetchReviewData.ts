'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import {
  EmploymentType,
  FinalStatusType,
  InterviewSeasonType,
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

  if (hasFinalStatusType)
    query = query.eq('final_status_type', finalStatusType);
  if (hasInterviewYear) query = query.eq('interview_year', interviewYear);
  if (hasInterviewSeason) query = query.eq('interview_season', interviewSeason);

  if (hasEmploymentType) query = query.eq('employment_type', employmentType);

  if (hasJobRole) query = query.eq('job_role.name', jobRole);

  if (hasInterviewProcesses) {
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
