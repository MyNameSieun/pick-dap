'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useFetchAnswerForQuestion } from '../hooks/useFetchAnswerQuestion';
import { useFetchQuestionDataByIdx } from '../hooks/useFetchQuestionData';
import { useSession } from '@/store/session';
import defaultProfile from '@/public/defaultProfile.png';
import CommentItem from './CommentItem';

interface QuestionListAnswersProps {
  idx: string;
}

const AnswersList = ({ idx }: QuestionListAnswersProps) => {
  const { data: question } = useFetchQuestionDataByIdx(Number(idx));
  const session = useSession();
  const user = session?.user;

  const { data: answers, isLoading } = useFetchAnswerForQuestion(
    question.id,
    user?.id,
  );

  return (
    <div>
      {!answers || answers.length === 0 ? (
        <>
          <EmptyStateBox
            title="아직 답변이 없습니다"
            description="첫 번째 답변의 주인공이 되어보세요!"
            buttonName="답변 작성하러 가기"
          />
        </>
      ) : (
        <section className="flex flex-col gap-6">
          {answers.map((answer) => (
            <article
              key={answer.id}
              className="rounded-[16px] bg-white p-8 shadow-sm"
            >
              <div className="flex justify-between">
                {/* 프로필 영역 */}
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={answer.author?.avatar_url || defaultProfile}
                      fill
                      className="object-cover"
                      alt="프로필 이미지"
                    />
                  </div>
                  <div>
                    <p className="b1 font-bold text-gray-900">
                      {answer.author?.nickname}
                    </p>
                    <time className="c1 text-gray-500">
                      {new Date(answer.created_at).toLocaleString()}
                    </time>
                  </div>
                </div>
                <Button variant={'white'}>
                  <Heart />
                  {answer.like_count}
                </Button>
              </div>
              <div className="mt-8">{answer.answer}</div>
              <Line />
              {/* 답변 영역 */}
              <div className="flex flex-col gap-6">
                <CommentItem answerData={answer} />
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default AnswersList;
