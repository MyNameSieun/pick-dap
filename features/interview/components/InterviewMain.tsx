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
    <>
      <Image
        height={180}
        width={240}
        alt="면접 연습 메인 이미지"
        src="/pickbot.png"
      />
      <h1 className="h1 text-black">면접 연습</h1>
      <p className="mb-12 text-xl text-gray-800">
        <b className="text-main-500">픽봇</b>과 함께 면접을 연습하고 자신감을
        키워보세요!
      </p>
      <div className="grid grid-cols-2 gap-8">
        <InterviewButton
          Icon={RotateCcw}
          onClick={() => router.push('/interview/rooms')}
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

      <p className="b1 mt-12 text-gray-800">
        질문에 대한 답변을 입력하여 면접을 진행할 수 있어요
      </p>
    </>
  );
};
export default InterviewMain;
