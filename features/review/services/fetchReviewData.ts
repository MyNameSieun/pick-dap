'use server';

import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const QUERY_JOIN_DATA = `
    *,
    interview_question (*),
    processes:review_process_map(process:interview_processes(*)),
    review_questions:review_question_type_map(question_type:review_question_type(*))
`;

const reviewJoinQuery = supabase
  .from('interview_review')
  .select(QUERY_JOIN_DATA);

export type RawReviewJoined = QueryData<typeof reviewJoinQuery>[number];

// 리뷰 목록
export const fetchReviewsDate = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('interview_review')
    .select(QUERY_JOIN_DATA);

  if (error) throw error;

  return data;
};

// 특정 리뷰 조회
export const fetchReviewById = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('interview_review')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};
