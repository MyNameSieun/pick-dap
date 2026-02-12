import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

const QUESTION_WITH_DETAILS_QUERY = `
  *,
  author:profiles(*),
  stats:question_stats(*),
  tags:question_tags(tag:tags(label)),
  category:question_category(category_type)
`;

// 목록 조회
export const fetchQuestion = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select(QUESTION_WITH_DETAILS_QUERY)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const questionsQuery = supabase
  .from('questions')
  .select(QUESTION_WITH_DETAILS_QUERY);

export type QuestionWithDetails = QueryData<typeof questionsQuery>[number];

// 상세 조회
export const fetchQuestionByIdx = async (idx: number) => {
  const { data, error } = await supabase
    .from('questions')
    .select(QUESTION_WITH_DETAILS_QUERY)
    .eq('idx', idx)
    .single();

  if (error) throw error;
  return data;
};
