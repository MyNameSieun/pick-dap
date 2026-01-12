import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { twMerge } from 'tailwind-merge';
import ProjectPrevSection from './InterviewProject/ProjectPrevSection';
import ProjectNextSection from './InterviewProject/ProjectNextSection';
import { FolderOpen } from 'lucide-react';

const InterviewProjectMain = () => {
  return (
    <>
      <BackButton
        label={
          <p>
            <b>면접 연습 메인</b>으로..
          </p>
        }
      />
      <div className={twMerge('container-col mb-4', 'p-5')}>
        <HeaderTitleBox
          title={<h2>프로젝트 면접 질문 생성하기</h2>}
          content={
            <p className="b1">진행한 프로젝트를 기반으로 면접 질문 생성</p>
          }
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
