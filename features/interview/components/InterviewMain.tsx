'use client';

import Image from 'next/image';
import InterviewButton from './InterviewButton/InterviewButton';
import { FolderOpen, RotateCcw, Save, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSaveQuestionModalAction } from '@/store/modal/saveQuestionModal';

const InterviewMain = () => {
  const router = useRouter();
  const { open } = useSaveQuestionModalAction();

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="animate-bounce-slow mb-6">
        <Image
          height={180}
          width={240}
          alt="면접 연습 메인 이미지"
          src="/pickbot.png"
          className="drop-shadow-xl"
        />
      </div>

      {/* 헤더 섹션 */}
      <div className="mb-12 space-y-3">
        <h1 className="h1 text-gray-1000 tracking-tight">면접 연습</h1>
        <p className="b1 text-gray-800">
          <span className="text-main-500 border-main-100 border-b-2 font-bold">
            픽봇
          </span>
          과 함께 실전처럼 연습하고 자신감을 키워보세요!
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        <InterviewButton
          Icon={RotateCcw}
          onClick={() => router.push('/interview/ai/room')}
        >
          지난 면접 기록 불러오기
        </InterviewButton>

        <InterviewButton Icon={Save} onClick={open}>
          저장된 질문 불러오기
        </InterviewButton>

        <InterviewButton
          Icon={Sparkles}
          onClick={() => router.push('/interview/ai')}
        >
          AI 면접 질문 생성하기
        </InterviewButton>

        <InterviewButton
          Icon={FolderOpen}
          onClick={() => router.push('/interview/project')}
        >
          프로젝트 질문 생성하기
        </InterviewButton>
      </div>

      <div className="mt-16 rounded-full bg-gray-100 p-4 px-8 shadow-sm">
        <p className="c1 flex items-center gap-2 text-gray-700">
          <span className="bg-main-300 inline-block h-2 w-2 animate-pulse rounded-full" />
          질문에 대한 답변을 입력하여 면접을 진행할 수 있어요
        </p>
      </div>
    </main>
  );
};

export default InterviewMain;
