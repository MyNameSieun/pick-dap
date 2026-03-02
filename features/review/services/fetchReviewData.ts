'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
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

// 리뷰 목록
export const fetchReviewsData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('interview_review')
    .select(QUERY_JOIN_DATA)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((review) => ({
    ...review,
    like_count: review.likes?.[0]?.count ?? 0,
    isLiked: review.myLiked && review.myLiked.length > 0,
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

export type RawReviewJoined = QueryData<typeof reviewJoinQuery>[number];

export type mapToReviewDetail = RawReviewJoined & {
  isLiked: boolean;
  like_count: number;
};
