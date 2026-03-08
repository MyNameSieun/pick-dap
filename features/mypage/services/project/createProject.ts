'use server';

import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { ProjectType } from '@/types/entity';

export interface createProjectProps {
  title: string;
  description: string;
  project_type: ProjectType;
  start_date?: string;
  end_date?: string;
  service_purpose: string;
  deploy_url?: string;
  github_url?: string;

  // 관계형 데이터 (배열) - 항목 여러개 추가 가능
  retrospectives?: { description: string }[];
  tech_stacks?: { description: string }[];
  performance?: { description: string }[];
  functions?: { description: string }[];
  roles?: { description: string }[];
  troubleshootings?: { description: string }[];
}

export const createProject = async (values: createProjectProps) => {
  const supabase = await createClient();
  const slug = generateSlug(values.title);

  // 로그인 사용자 정보 가져오기
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError)
    throw new Error(`사용자 인증에 실패했습니다. : ${authError?.message}`);

  // 1. 부모 생성
  const { data: project, error: pError } = await supabase
    .from('project')
    .insert({
      user_id: user.id,
      title: values.title,
      description: values.description,
      project_type: values.project_type,
      start_date: values.start_date || null,
      end_date: values.end_date || null,
      service_purpose: values.service_purpose,
      deploy_url: values.deploy_url || null,
      github_url: values.github_url || null,
      slug: slug,
    })
    .select()
    .single();
  if (pError)
    throw new Error(`프로젝트 등록에 실패했습니다. : ${pError.message}`);

  // 2. 관계형 데이터 등록
  const insertPromises = [];

  if (values.retrospectives?.length) {
    insertPromises.push(
      supabase.from('project_retrospective').insert(
        values.retrospectives.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  if (values.troubleshootings?.length) {
    insertPromises.push(
      supabase.from('project_troubleshooting').insert(
        values.troubleshootings.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  if (values.performance?.length) {
    insertPromises.push(
      supabase.from('project_performance').insert(
        values.performance.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  if (values.roles?.length) {
    insertPromises.push(
      supabase.from('project_role').insert(
        values.roles.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  if (values.functions?.length) {
    insertPromises.push(
      supabase.from('project_function').insert(
        values.functions.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  if (values.tech_stacks?.length) {
    insertPromises.push(
      supabase.from('project_tech_stack').insert(
        values.tech_stacks.map((val, idx) => ({
          project_id: project.id,
          description: val.description,
          sort_order: idx,
        })),
      ),
    );
  }

  // 병렬 처리
  if (insertPromises.length > 0) {
    const results = await Promise.all(insertPromises);

    const firstError = results.find((r) => r.error);

    if (firstError)
      throw new Error(`상세 정보 등록 실패: ${firstError.error?.message}`);
  }

  return project;
};
