'use client';

import { Pen, Send } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'sonner';
import Image from 'next/image';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchQuestionDataByIdx } from '../hooks/useFetchQuestionData';
import { useSession } from '@/store/session';
import { useEffect, useState } from 'react';
import { useCreateQuestionAnswers } from '../hooks/useCreateQuestionAnswers';
import { useFetchAnswerQuestionById } from '../hooks/useFetchAnswerQuestion';
import BackButton from '@/components/common/BackButton';
import QuestionAnswerHeaderTextArea from './QuestionAnswerHeaderTextArea';
import Loader from '@/components/ui/Loader';
import { useUpdateAnswerQuestion } from '../hooks/useUpdateAnswerQuestion';
import QuestionContentHeader from './QuestionContentHeader';
import { usePathname } from 'next/navigation';

interface QuestionHeaderProps {
  idx: number;
  slug: string;
}

const QuestionHeader = ({ idx }: QuestionHeaderProps) => {
  // 조회
  const { data: question } = useFetchQuestionDataByIdx(idx);

  const auth = useSession();
  const userId = auth?.user?.id;
  const isAuthor = question?.author?.id === userId;
  const pathname = usePathname();

  const { data: answerData, isLoading } = useFetchAnswerQuestionById(
    question.id,
    userId,
  );

  const [answer, setAnswer] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  // 등록
  const { mutate: handleSaveQuesion, isPending: answerPending } =
    useCreateQuestionAnswers({
      onSuccess: () => {
        toast.success('답변이 등록되었습니다.');
      },
      onError: (error) => {
        toast.success('답변 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        console.log(error.message);
      },
    });

  const handleSaveQuesionClick = () => {
    handleSaveQuesion({
      answers: answer,
      questionIdx: Number(idx),
    });
    setIsEditing(false);
  };

  // 수정
  const { mutate: updateAnswer, isPending: isUpdateAnswerPending } =
    useUpdateAnswerQuestion({
      onSuccess: () => {
        toast.success('답변이 수정 되었습니다.', { position: 'top-center' });
        close();
      },
      onError: (error) => {
        toast.error('답변 수정에 실패했습니다.', { position: 'top-center' });
        console.error('답변 수정 실패 원인:', error);
      },
    });

  const handleEditModeClick = () => {
    if (isEditing && answerData) {
      if (answer.trim() === answerData.answer?.trim()) {
        toast.warning('변경된 내용이 없습니다', { position: 'top-center' });
        return;
      }
      updateAnswer({
        id: answerData?.id,
        answer: answer,
      });
      setIsEditing(false);
    } else {
      if (answerData) {
        setAnswer(answerData.answer);
      }
      setIsEditing(true); // 수정 모드로 전환
    }
  };
  if (isLoading) return <Loader />;

  // 수정 취소
  const handleCancelClick = () => {
    setAnswer(answerData?.answer || '');
    setIsEditing(false);
  };

  return (
    <>
      {pathname.endsWith('/question') && <BackButton label={'뒤로가기'} />}
      <div className="rounded-[4px] bg-white p-8 shadow-sm">
        <QuestionContentHeader question={question} isAuthor={isAuthor} />

        {/* 프로필 */}
        <div className="flex gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              onDragStart={(e) => e.preventDefault()} // 드래그 이벤트 차단
              className="object-cover"
              alt="작성자 프로필"
              src={question.author.avatar_url || defaultProfile}
              fill
              priority
            />
          </div>
          <div className="flex flex-col justify-around">
            <p className="b1 font-bold text-gray-900">
              {question.author.nickname}
            </p>
            <div className="text-icon-default items-cen flex gap-5">
              <div>
                <p className="c1">
                  작성일: {new Date(question.created_at).toLocaleString()}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-100" />
        <QuestionAnswerHeaderTextArea
          answerData={answerData ?? null}
          questionId={question.id}
          answer={answer}
          setAnswer={setAnswer}
          isEditing={isEditing}
        />
        <div className="flex w-full justify-end">
          {!answerData ? (
            <Button
              disabled={answerPending}
              onClick={handleSaveQuesionClick}
              className="mt-2 h-12 gap-3.5"
              variant={'default'}
              size="lg"
            >
              <Send />
              <p className="b1">답변 저장</p>
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button
                disabled={isUpdateAnswerPending}
                onClick={handleEditModeClick}
                className="mt-2 h-12"
                variant={'default'}
                size="lg"
              >
                <Pen />
                <p className="b1">{isEditing ? '수정 완료' : '답변 수정'}</p>
              </Button>
              {isEditing && (
                <Button
                  onClick={handleCancelClick}
                  className="b1 mt-2 h-12"
                  variant={'white'}
                >
                  취소
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionHeader;
