'use server';
import { createClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/supabase';
import { QueryData } from '@supabase/supabase-js';

export const fetchMyListProject = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 정보가 없습니다.');

  const { data, error } = await supabase
    .from('project')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('프로젝트 데이터를 불러오지 못했습니다.');
  }

  return data;
};

const PROJECT_DETAIL_QUERY = `
  *,
  retrospective:project_retrospective(*),
  troubleshooting:project_troubleshooting(*),
  performance:project_performance(*),
  tech_stack:project_tech_stack(*),
  role:project_role(*),
  function:project_function(*)
`;
const projectDetailJoinQuery = supabase
  .from('project')
  .select(PROJECT_DETAIL_QUERY);
export type RawProjectDetailJoined = QueryData<
  typeof projectDetailJoinQuery
>[number];

export const fetchProjectMyDetail = async (slug: string) => {
  const supabase = await createClient();
  const decodedSlug = decodeURIComponent(slug);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 정보가 없습니다.');

  const { data, error } = await supabase
    .from('project')
    .select(PROJECT_DETAIL_QUERY)
    .eq('user_id', user?.id)
    .eq('slug', decodedSlug)
    .maybeSingle();

  if (error) {
    console.log(error?.message);
    throw new Error('프로젝트 데이터를 불러오지 못했습니다.');
  }

  return data;
};
