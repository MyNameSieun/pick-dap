'use client';

import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';
import Achievements from '@/features/mypage/components/ProjectNewPage/Achievements';
import Deliverables from '@/features/mypage/components/ProjectNewPage/Deliverables';
import Features from '@/features/mypage/components/ProjectNewPage/Features';
import Overview from '@/features/mypage/components/ProjectNewPage/Overview';
import Retrospective from '@/features/mypage/components/ProjectNewPage/Retrospective';
import Role from '@/features/mypage/components/ProjectNewPage/Role';
import TechStack from '@/features/mypage/components/ProjectNewPage/TechStack';
import Troubleshooting from '@/features/mypage/components/ProjectNewPage/Troubleshooting';
import { PROJECT_CONTENTS } from '@/constants/contents';
import { FolderPlus } from 'lucide-react';
import { useCreateProject } from '@/features/mypage/hooks/project/useCreateProject';
import Loader from '@/components/ui/Loader';
import { useCreateProjectStore } from '@/features/mypage/store/useCreateProjectStore';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

const MypageProjectNewPage = () => {
  const { formData, reset } = useCreateProjectStore();
  const { mutate: createProject, isPending } = useCreateProject();
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const projectTypeRef = useRef<HTMLButtonElement>(null);
  const purposeRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.description.trim()) {
      descriptionRef.current?.focus();
      descriptionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    if (!formData.project_type) {
      projectTypeRef.current?.focus();
      projectTypeRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    if (!formData.service_purpose.trim()) {
      purposeRef.current?.focus();
      purposeRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

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
        router.push('/mypage/projects');
      },
    });
  };

  if (isPending) return <Loader />;
  return (
    <CreateFormLayout
      onSubmit={handleSubmit}
      isLoading={isPending}
      BackButtonLabel="마이페이지로 돌아가기"
      HeaderTitleBoxObj={{
        title: '프로젝트 추가',
        content: '자세히 입력할수록 AI가 더 정확한 질문을 생성할 수 있습니다.',
        icon: FolderPlus,
      }}
      contents={PROJECT_CONTENTS}
    >
      <Overview
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        projectTypeRef={projectTypeRef}
        purposeRef={purposeRef}
      />
      <TechStack />
      <Features />
      <Role />
      <Troubleshooting />
      <Achievements />
      <Retrospective />
      <Deliverables />
    </CreateFormLayout>
  );
};

export default MypageProjectNewPage;
