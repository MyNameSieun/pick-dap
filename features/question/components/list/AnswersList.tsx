'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import Line from '@/components/common/Line';
import Image from 'next/image';
import defaultProfile from '@/public/defaultProfile.png';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import { useFetchQuestionByIdx } from '../../hooks/question/useFetchQuestionData';
import { useFetchAnswersData } from '../../hooks/answer/useFetchAnswer';
import CommentInput from './CommentInput';
import { isUpdateWrite } from '@/lib/isUpdateWrite';
import { LikeAnswerButton } from './LikeAnswerButton';

interface QuestionListAnswersProps {
  idx: string;
}

const AnswersList = ({ idx }: QuestionListAnswersProps) => {
  const { data: question } = useFetchQuestionByIdx(Number(idx));
  const { data: answers, isLoading } = useFetchAnswersData(question?.id);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="space-y-6">
      {!answers || answers.length === 0 ? (
        <EmptyStateBox
          title="아직 답변이 없습니다"
          description="첫 번째 답변의 주인공이 되어보세요!"
          buttonName="답변 작성하러 가기"
        />
      ) : (
        <section className="flex flex-col gap-6">
          {answers.map((answer) => (
            <article
              key={answer.id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8"
            >
              <div className="flex items-start justify-between">
                {/* 프로필 */}
                <div className="flex items-center gap-4">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-gray-50">
                    <Image
                      src={answer.author?.avatar_url || defaultProfile}
                      fill
                      className="object-cover"
                      alt="프로필 이미지"
                    />
                  </div>
                  <div>
                    <p className="mb-1.5 text-[15px] leading-none font-bold text-gray-900">
                      {answer.author?.nickname}
                    </p>
                    <div className="flex items-center gap-1 text-[13px] text-gray-500">
                      <time className="c1 text-gray-500">
                        {new Date(answer.created_at).toLocaleString()}
                        {isUpdateWrite(
                          answer.created_at,
                          answer.updated_at,
                        ) && <span className="ml-1">(수정됨)</span>}
                      </time>
                    </div>
                  </div>
                </div>
                {/* 좋아요 버튼  */}
                <LikeAnswerButton
                  answerId={answer.id}
                  questionId={question.id}
                  answerLikeCount={answer.like_count}
                  isLiked={answer.isLiked}
                />
              </div>

              <div className="b1 mt-7 min-h-[60px] leading-relaxed whitespace-pre-wrap text-gray-800">
                {answer.answer}
              </div>

              <div className="mt-8 mb-6">
                <Line className="bg-gray-50" />
              </div>

              <Suspense fallback={<Loader />}>
                <CommentInput answerData={answer} />
              </Suspense>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default AnswersList;
