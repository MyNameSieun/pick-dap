'use client';

import { useCreateProject } from '@/features/mypage/hooks/project/useCreateProject';
import Loader from '@/components/ui/Loader';
import { useCreateProjectStore } from '@/features/mypage/store/useCreateProjectStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProjectForm from '@/features/mypage/components/ProjectForm';

const MypageProjectNewPage = () => {
  const { formData, reset } = useCreateProjectStore();
  const { mutate: createProject, isPending } = useCreateProject();
  const router = useRouter();

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      tech_stacks: formData.tech_stacks.map(({ id, ...rest }) => rest),
      functions: formData.functions.map(({ id, ...rest }) => rest),
      troubleshootings: formData.troubleshootings.map(
        ({ id, ...rest }) => rest,
      ),
      roles: formData.roles.map(({ id, ...rest }) => rest),
      performance: formData.performance.map(({ id, ...rest }) => rest),
      retrospectives: formData.retrospectives.map(({ id, ...rest }) => rest),
    };

    createProject(finalData, {
      onSuccess: () => {
        reset();
        toast.success('프로젝트가 추가되었습니다.');
        router.push('/mypage/project');
      },
    });
  };
  const canSubmit =
    !!formData.title.trim() &&
    !!formData.description.trim() &&
    !!formData.project_type &&
    !!formData.service_purpose.trim();

  if (isPending) return <Loader />;
  return (
    <ProjectForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      title="프로젝트 추가"
      type="CREATE"
      isSubmittable={canSubmit}
    />
  );
};

export default MypageProjectNewPage;
