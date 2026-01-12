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
            <b>면접 연습 메인</b>으로..
          </p>
        }
      />
      <div className={twMerge('container-col mb-4', 'p-5')}>
        <HeaderTitleBox
          title={<h2>AI 면접 질문 생성하기</h2>}
          content={<p className="b1">AI를 통해 랜덤으로 면접 질문 생성</p>}
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
