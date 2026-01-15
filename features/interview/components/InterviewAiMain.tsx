'use client';

import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import AiPrevSection from './InterviewAi/AiPrevSection';
import AiNextSection from './InterviewAi/AiNextSection';

const InterviewAiMain = () => {
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
          title={'AI 면접 질문 생성하기'}
          content={'AI를 통해 랜덤으로 면접 질문 생성'}
          icon={Sparkles}
        />
      </div>
      <div className="flex items-start gap-4">
        <AiPrevSection />
        <AiNextSection />
      </div>
    </>
  );
};
export default InterviewAiMain;
