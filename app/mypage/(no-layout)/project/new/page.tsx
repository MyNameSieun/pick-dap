import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';
import Achievements from '@/features/mypage/components/ProjectNewPage/Achievements';
import Deliverables from '@/features/mypage/components/ProjectNewPage/Deliverables';
import ExtraInfo from '@/features/mypage/components/ProjectNewPage/ExtraInfo';
import Features from '@/features/mypage/components/ProjectNewPage/Features';
import Overview from '@/features/mypage/components/ProjectNewPage/Overview';
import Retrospective from '@/features/mypage/components/ProjectNewPage/Retrospective';
import Role from '@/features/mypage/components/ProjectNewPage/Role';
import TechStack from '@/features/mypage/components/ProjectNewPage/TechStack';
import Troubleshooting from '@/features/mypage/components/ProjectNewPage/Troubleshooting';
import { PROJECT_CONTENTS } from '@/constants/contents';
import { FolderPlus } from 'lucide-react';

const MypageProjectNewPage = () => {
  return (
    <CreateFormLayout
      BackButtonLabel="마이페이지로 돌아가기"
      HeaderTitleBoxObj={{
        title: '프로젝트 추가 ',
        content: '자세히 입력할수록 AI가 더 정확한 질문을 생성할 수 있습니다.',
        icon: FolderPlus,
      }}
      contents={PROJECT_CONTENTS}
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

export default MypageProjectNewPage;
