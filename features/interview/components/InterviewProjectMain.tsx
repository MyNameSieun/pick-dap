import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import ProjectPrevSection from './InterviewProject/ProjectPrevSection';
import ProjectNextSection from './InterviewProject/ProjectNextSection';
import { FolderOpen } from 'lucide-react';

const InterviewProjectMain = () => {
  return (
    <>
      <BackButton
        label={
          <p>
            <b>면접 연습 메인</b>으로 돌아가기
          </p>
        }
      />
      <div>
        <HeaderTitleBox
          title={'프로젝트 면접 질문 생성하기'}
          content={'진행한 프로젝트를 기반으로 면접 질문 생성'}
          icon={FolderOpen}
        />
      </div>
      <div className="flex items-start gap-4">
        <ProjectPrevSection />
        <ProjectNextSection />
      </div>
    </>
  );
};
export default InterviewProjectMain;
