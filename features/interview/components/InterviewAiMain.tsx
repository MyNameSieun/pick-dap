'use client';

import { useState } from 'react';
import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Sparkles } from 'lucide-react';
import AiPrevSection from './InterviewAi/AiPrevSection';
import AiNextSection from './InterviewAi/AiNextSection';
import useFetchGenerateQuestions from '../hooks/useFetchGenerateQuestions';
import {
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
} from '../services/fetchGenerateQuestions';
import { useCreateInterview } from '../hooks/useCreateAiInterview';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CategoryTypeEnums } from '@/types/entity';

const INTERVIEW_SESSION_KEY = 'ai_interview_session_bundle';

interface InterviewSessionData {
  category: string;
  questions: GenerateQuestionsResponse[];
}

const InterviewAiMain = () => {
  const { mutate: generateQuestions, isPending: isgenerateQuestionsPending } =
    useFetchGenerateQuestions();
  const router = useRouter();

  const { mutate: startInterview, isPending: isStartPending } =
    useCreateInterview({
      onSuccess: (data) => {
        router.push(`/interview/ai/room/${data?.id}`);
      },
      onError: () => {
        toast.error('면접 방 생성에 실패했습니다.');
      },
    });

  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(
    () => {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem(INTERVIEW_SESSION_KEY);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (error) {
            console.error('세션 복구 실패:', error);
          }
        }
      }
      return null;
    },
  );

  const handleGenerate = (options: GenerateQuestionsRequest) => {
    setSessionData(null);

    generateQuestions(options, {
      onSuccess: (data) => {
        const newBundle: InterviewSessionData = {
          category: options.question_type,
          questions: data,
        };

        setSessionData(newBundle);

        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            INTERVIEW_SESSION_KEY,
            JSON.stringify(newBundle),
          );
        }
      },
    });
  };

  const handleStart = (selectedQuestion: GenerateQuestionsResponse) => {
    if (!sessionData?.category) {
      toast.error('카테고리 정보가 없습니다. 질문을 다시 생성해주세요.');
      return;
    }

    startInterview({
      categoryType: sessionData.category as CategoryTypeEnums,
      questionId: selectedQuestion.id,
      initialQuestion: selectedQuestion.question,
    });
  };

  return (
    <>
      <BackButton
        label={
          <p>
            <b>면접 연습 메인</b>으로 돌아가기
          </p>
        }
      />
      <div className="mb-6">
        <HeaderTitleBox
          title={'AI 면접 질문 생성하기'}
          content={'AI를 통해 랜덤으로 면접 질문 생성'}
          icon={Sparkles}
        />
      </div>

      <div className="flex items-start gap-4">
        <AiPrevSection
          onGenerate={handleGenerate}
          isPending={isgenerateQuestionsPending}
        />

        <AiNextSection
          questions={sessionData?.questions || []}
          isPending={isgenerateQuestionsPending || isStartPending}
          onStart={handleStart}
        />
      </div>
    </>
  );
};

export default InterviewAiMain;
