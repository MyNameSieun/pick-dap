'use server';

import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { ProjectType } from '@/types/entity';

interface ProjectDetailItem {
  id?: string;
  description: string;
}

export interface UpdateProjectParams {
  id: string;
  title: string;
  description: string | null;
  project_type: ProjectType;
  start_date?: string | null;
  end_date?: string | null;
  service_purpose: string;
  deploy_url?: string | null;
  github_url?: string | null;
  slug: string;

  tech_stacks: ProjectDetailItem[];
  functions: ProjectDetailItem[];
  roles: ProjectDetailItem[];
  troubleshootings: ProjectDetailItem[];
  performances: ProjectDetailItem[];
}

export const updateProject = async (
  project: Partial<UpdateProjectParams> & { id: string },
) => {
  const supabase = await createClient();

  let finalSlug = project.title ? generateSlug(project.title) : undefined;

  if (finalSlug) {
    const { data: existingProjects } = await supabase
      .from('project')
      .select('slug')
      .eq('slug', finalSlug)
      .not('id', 'eq', project.id);

    if (existingProjects && existingProjects.length > 0) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 5)}`;
    }
  }

  // 1. 메인 프로젝트 수정
  const { data: updatedData, error: pError } = await supabase
    .from('project')
    .update({
      title: project.title,
      description: project.description,
      project_type: project.project_type,
      start_date: project.start_date,
      end_date: project.end_date,
      service_purpose: project.service_purpose,
      deploy_url: project.deploy_url,
      github_url: project.github_url,
      slug: finalSlug,
    })
    .eq('id', project.id)
    .select()
    .single();

  if (pError)
    throw new Error(`프로젝트 기본 정보 수정 실패: ${pError.message}`);

  // 2. 관계 테이블 처리

  // 기술스택
  if (project.tech_stacks) {
    await supabase
      .from('project_tech_stack')
      .delete()
      .eq('project_id', project.id);
    if (project.tech_stacks.length > 0) {
      const { error } = await supabase.from('project_tech_stack').insert(
        project.tech_stacks.map((item, index) => ({
          project_id: project.id,
          description: item.description,
          sort_order: index,
        })),
      );
      if (error) throw new Error(`기술 스택 저장 실패: ${error.message}`);
    }
  }

  // 핵심 기능
  if (project.functions) {
    await supabase
      .from('project_function')
      .delete()
      .eq('project_id', project.id);
    if (project.functions.length > 0) {
      const { error } = await supabase.from('project_function').insert(
        project.functions.map((item, index) => ({
          project_id: project.id,
          description: item.description,
          sort_order: index,
        })),
      );
      if (error) throw new Error(`핵심 기능 저장 실패: ${error.message}`);
    }
  }

  // 담당 역할
  if (project.roles) {
    await supabase.from('project_role').delete().eq('project_id', project.id);
    if (project.roles.length > 0) {
      const { error } = await supabase.from('project_role').insert(
        project.roles.map((item, index) => ({
          project_id: project.id,
          description: item.description,
          sort_order: index,
        })),
      );
      if (error) throw new Error(`담당 역할 저장 실패: ${error.message}`);
    }
  }

  // 문제 해결
  if (project.troubleshootings) {
    await supabase
      .from('project_troubleshooting')
      .delete()
      .eq('project_id', project.id);
    if (project.troubleshootings.length > 0) {
      const { error } = await supabase.from('project_troubleshooting').insert(
        project.troubleshootings.map((item, index) => ({
          project_id: project.id,
          description: item.description,
          sort_order: index,
        })),
      );
      if (error) throw new Error(`문제 해결 저장 실패: ${error.message}`);
    }
  }

  // 성과
  if (project.performances) {
    await supabase
      .from('project_performance')
      .delete()
      .eq('project_id', project.id);
    if (project.performances.length > 0) {
      const { error } = await supabase.from('project_performance').insert(
        project.performances.map((item, index) => ({
          project_id: project.id,
          description: item.description,
          sort_order: index,
        })),
      );
      if (error) throw new Error(`성과 저장 실패: ${error.message}`);
    }
  }

  return updatedData;
};
