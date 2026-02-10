'use client';

import Tags from '@/components/common/Tags/Tags';
import { Bookmark, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'sonner';
import Image from 'next/image';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchQuestionDataByIdx } from '../hooks/useFetchQuestionData';
import { useSession } from '@/store/session';
import QuestionMenu from './QuestionMenu';
import { useState } from 'react';
import { useCreateQuestionAnswers } from '../hooks/useCreateQuestionAnswers';

interface QuestionHeaderProps {
  idx: string;
  slug: string;
}

const QuestionHeader = ({ idx, slug }: QuestionHeaderProps) => {
  const { data: question } = useFetchQuestionDataByIdx(idx);

  const [answer, setAnswer] = useState('');
  const [successAnswer, setSuccessAnswer] = useState(false);
  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장이 완료되었습니다!', {
      position: 'top-center',
    });
  };

  const auth = useSession();
  const isAuthor = question?.author?.id === auth?.user?.id;

  const { mutate: handleSaveQuesion, isPending: answerPending } =
    useCreateQuestionAnswers({
      onSuccess: () => {
        setSuccessAnswer(true);
        toast.success('답변이 등록되었습니다.');
      },
      onError: (error) => {
        toast.success(
          '답변 답변 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        );
        console.log(error.message);
      },
    });

  const handleSaveQuesionClick = () => {
    handleSaveQuesion({
      answers: answer,
      questionIdx: Number(idx),
    });
  };

  return (
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

      <h3 className="mb-6">나의 답변 작성</h3>
      {successAnswer ? (
        <div>성공</div>
      ) : (
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="이 질문에 대한 답변을 작성해보세요"
          className="bg-bg-default b1 h-45 p-4"
          autoFocus
        />
      )}

      <div className="flex w-full justify-end">
        <Button
          disabled={answerPending}
          onClick={handleSaveQuesionClick}
          className="mt-4 h-12 gap-3.5"
          variant={'default'}
          size="lg"
        >
          <Send />
          답변 저장
        </Button>
      </div>
    </div>
  );
};

export default QuestionHeader;
