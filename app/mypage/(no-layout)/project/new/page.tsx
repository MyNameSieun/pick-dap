import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';
import { PROJECT_CONTENTS } from '@/types/contents';
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
      d
    </CreateFormLayout>
  );
};

export default MypageProjectNewPage;
