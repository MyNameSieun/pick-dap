'use client';

import Tags from '@/components/common/Tags/Tags';
import { Bookmark, Pen, Send } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'sonner';
import Image from 'next/image';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchQuestionDataByIdx } from '../hooks/useFetchQuestionData';
import { useSession } from '@/store/session';
import QuestionMenu from './QuestionMenu';
import { useState } from 'react';
import { useCreateQuestionAnswers } from '../hooks/useCreateQuestionAnswers';
import { useFetchAnswerQuestionById } from '../hooks/useFetchAnswerQuestion';
import BackButton from '@/components/common/BackButton';
import QuestionAnswerHeaderTextArea from './QuestionAnswerHeaderTextArea';
import Loader from '@/components/ui/Loader';
import { useUpdateAnswerQuestion } from '../hooks/useUpdateAnswerQuestion';

interface QuestionHeaderProps {
  idx: number;
  slug: string;
}

const QuestionHeader = ({ idx, slug }: QuestionHeaderProps) => {
  const { data: question } = useFetchQuestionDataByIdx(idx);

  const auth = useSession();
  const userId = auth?.user?.id;
  const isAuthor = question?.author?.id === userId;

  const { data: answerData, isLoading } = useFetchAnswerQuestionById(
    question.id,
    userId,
  );
  const [answer, setAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장이 완료되었습니다!', {
      position: 'top-center',
    });
  };
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
      updateAnswer({
        id: answerData?.id,
        answer: answer,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true); // 수정 모드로 전환
    }
  };
  if (isLoading) return <Loader />;

  return (
    <>
      <BackButton label={'뒤로가기'} />
      <div className="rounded-[4] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {question.category?.category_type && (
              <Tags color="blue" size="big">
                {question.category.category_type}
              </Tags>
            )}
            {question.tags.map(({ tag }) => (
              <Tags key={tag.label} size="big">
                {tag.label}
              </Tags>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={'white'}
              className="h-10.5"
              onClick={onClickSaveButtonHandler}
            >
              <Bookmark />
              {question.stats?.bookmark_count ?? 0}
            </Button>
            {isAuthor && <QuestionMenu question={question} />}
          </div>
        </div>
        <h2 className="mt-8 mb-15">{question.title}</h2>
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
                  작성일 {new Date(question.created_at).toLocaleString()}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8 border border-gray-100" />
        <QuestionAnswerHeaderTextArea
          questionId={question.id}
          userId={userId as string}
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
                  onClick={() => setIsEditing(false)}
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
