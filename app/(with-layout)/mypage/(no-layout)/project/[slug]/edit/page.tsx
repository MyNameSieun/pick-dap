'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import ProjectForm from '@/features/mypage/components/ProjectForm';
import { useFetchProjectMyDetail } from '@/features/mypage/hooks/project/useFetchProject';
import Loader from '@/components/ui/Loader';
import { useUpdateProject } from '@/features/mypage/hooks/project/useUpdateProject';
import { useCreateProjectStore } from '@/features/mypage/store/useCreateProjectStore';
import { useEffect } from 'react';

const ProjectEditPage = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const router = useRouter();
  interface ProjectRelationItem {
    id: string;
    description: string | null;
  }
  const {
    data: project,
    isLoading: isFetching,
    isError,
  } = useFetchProjectMyDetail(slug);
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const { setAllFields, reset, formData: storeData } = useCreateProjectStore();

  const checkIsDirty = () => {
    if (!project) return false;

    const isBaseChanged =
      storeData.title !== (project.title ?? '') ||
      storeData.description !== (project.description ?? '') ||
      storeData.project_type !== project.project_type ||
      storeData.service_purpose !== (project.service_purpose ?? '') ||
      storeData.start_date !== (project.start_date ?? '') ||
      storeData.end_date !== (project.end_date ?? '') ||
      storeData.deploy_url !== (project.deploy_url ?? '') ||
      storeData.github_url !== (project.github_url ?? '');

    const formatForCompare = (
      items: ProjectRelationItem[] | undefined | null,
    ) => items?.map((item) => item.description ?? '') || [];

    const isArraysChanged =
      JSON.stringify(storeData.tech_stacks.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.tech_stack)) ||
      JSON.stringify(storeData.functions.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.function)) ||
      JSON.stringify(storeData.roles.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.role)) ||
      JSON.stringify(storeData.troubleshootings.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.troubleshooting)) ||
      JSON.stringify(storeData.performance.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.performance)) ||
      JSON.stringify(storeData.retrospectives.map((i) => i.description)) !==
        JSON.stringify(formatForCompare(project.retrospective));

    return isBaseChanged || isArraysChanged;
  };

  const isDirty = checkIsDirty();
  const canSubmit =
    !!storeData.title?.trim() &&
    !!storeData.service_purpose?.trim() &&
    !!project?.id &&
    isDirty;

  useEffect(() => {
    if (project) {
      const formatItems = (items: ProjectRelationItem[] | undefined | null) =>
        items?.map((item) => ({
          id: item.id,
          description: item.description ?? '',
        })) || [];

      setAllFields({
        title: project.title ?? '',
        description: project.description ?? '',
        project_type: project.project_type,
        start_date: project.start_date ?? '',
        end_date: project.end_date ?? '',
        service_purpose: project.service_purpose ?? '',
        deploy_url: project.deploy_url ?? '',
        github_url: project.github_url ?? '',
        tech_stacks: formatItems(project.tech_stack),
        functions: formatItems(project.function),
        roles: formatItems(project.role),
        troubleshootings: formatItems(project.troubleshooting),
        performance: formatItems(project.performance),
        retrospectives: formatItems(project.retrospective),
      });
    }
    return () => reset();
  }, [project, setAllFields, reset]);

  const handleSubmit = () => {
    if (!project?.id) return;

    const sanitizedData = {
      ...storeData,
      id: project.id,
      start_date: storeData.start_date || null,
      end_date: storeData.end_date || null,
      deploy_url: storeData.deploy_url || null,
      github_url: storeData.github_url || null,
      description: storeData.description || null,
    };

    updateProject(sanitizedData, {
      onSuccess: (data) => {
        toast.success('프로젝트가 수정되었습니다.');
        router.replace(`/mypage/project/${data?.slug || slug}`);
      },
    });
  };

  if (isError) return <div>에러 발생...</div>;
  if (isFetching) return <Loader />;

  return (
    <ProjectForm
      onSubmit={handleSubmit}
      isLoading={isUpdating}
      initialData={project}
      title="프로젝트 수정"
      type="EDIT"
      isSubmittable={canSubmit}
    />
  );
};

export default ProjectEditPage;
