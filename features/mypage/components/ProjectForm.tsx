'use client';

import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';

import { FolderPlus } from 'lucide-react';
import { PROJECT_CONTENTS } from '@/constants/contents';
import Overview from './ProjectNewPage/Overview';
import TechStack from './ProjectNewPage/TechStack';
import Features from './ProjectNewPage/Features';
import Role from './ProjectNewPage/Role';
import Troubleshooting from './ProjectNewPage/Troubleshooting';
import Achievements from './ProjectNewPage/Achievements';
import Retrospective from './ProjectNewPage/Retrospective';
import Deliverables from './ProjectNewPage/Deliverables';
import { UpdateProjectParams } from '../services/project/updateProject';

interface Props {
  onSubmit: () => void;
  isLoading: boolean;
  title: string;
  initialData?: Partial<UpdateProjectParams> | null;

  type: 'CREATE' | 'EDIT';
  isSubmittable?: boolean;
}

const ProjectForm = ({
  onSubmit,
  isLoading,
  title,
  type,
  isSubmittable,
}: Props) => {
  return (
    <CreateFormLayout
      onSubmit={onSubmit}
      isLoading={isLoading}
      BackButtonLabel="돌아가기"
      HeaderTitleBoxObj={{
        title,
        content: '자세히 입력할수록 AI가 더 정확한 질문을 생성할 수 있습니다.',
        icon: FolderPlus,
      }}
      contents={PROJECT_CONTENTS}
      type={type}
      isSubmittable={isSubmittable}
    >
      <Overview />
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

export default ProjectForm;
