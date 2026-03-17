'use client';

import { useState } from 'react';
import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Sparkles } from 'lucide-react';
import AiPrevSection from './InterviewAi/AiPrevSection';
import AiNextSection from './InterviewAi/AiNextSection';
import useFetchGenerateQuestions from '../services/useFetchGenerateQuestions';
import {
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
} from '../hooks/fetchGenerateQuestions';

const STORAGE_KEY = 'interview_generated_questions';

const InterviewAiMain = () => {
  useState<GenerateQuestionsResponse | null>(null);

  const { mutate, isPending } = useFetchGenerateQuestions();

  // 1. 처음 화면에 들어왔을 때 저장된 질문 복구
  const [questions, setQuestions] = useState<GenerateQuestionsResponse[]>(
    () => {
      if (typeof window !== 'undefined') {
        const savedQuestions = sessionStorage.getItem(STORAGE_KEY);
        if (savedQuestions) {
          try {
            return JSON.parse(savedQuestions);
          } catch (error) {
            console.error('저장된 질문을 불러오는 데 실패했습니다.', error);
          }
        }
      }
      return [];
    },
  );

  // 새로운 질문 요청 시
  const handleGenerate = (options: GenerateQuestionsRequest) => {
    setQuestions([]);

    mutate(options, {
      onSuccess: (data) => {
        setQuestions(data);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      },
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
      <div>
        <HeaderTitleBox
          title={'AI 면접 질문 생성하기'}
          content={'AI를 통해 랜덤으로 면접 질문 생성'}
          icon={Sparkles}
        />
      </div>

      <div className="flex items-start gap-4">
        <AiPrevSection onGenerate={handleGenerate} isPending={isPending} />

        <AiNextSection questions={questions} isPending={isPending} />
      </div>
    </>
  );
};

export default InterviewAiMain;
