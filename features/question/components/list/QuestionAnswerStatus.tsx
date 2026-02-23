'use client';

import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Crown, PenLine, ChevronRight } from 'lucide-react';

import { useSession } from '@/store/session';
import Link from 'next/link';
import {
  useFetchAnswersData,
  useFetchMyAnswerData,
} from '../../hooks/answer/useFetchAnswerData';
import QuestionContentHeader from '../common/QuestionContentHeader';
import Loader from '@/components/ui/Loader';
import { useFetchQuestionByIdxData } from '../../hooks/question/useFetchQuestionData';

const QuestionAnswerStatus = ({ idx, slug }: { idx: string; slug: string }) => {
  const auth = useSession();
  const userId = auth?.user?.id;
  const { data: question, isLoading: isQuestionLoading } =
    useFetchQuestionByIdxData(idx);
  const { data: answers, isLoading: isAnswersLoading } = useFetchAnswersData(
    question?.id ?? '',
  );

  const { data: answerData, isLoading: isMyAnswerLoading } =
    useFetchMyAnswerData(question?.id || '');
  if (isQuestionLoading || isAnswersLoading || isMyAnswerLoading || !question) {
    return <Loader />;
  }

  // question이 존재함이 보장된 후 호출
  const isAuthor = question.author?.id === userId;

  return (
    <div className="flex flex-col gap-6">
      <BackButton label={'답변 목록으로'} />
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <QuestionContentHeader question={question} isAuthor={isAuthor} />
        <div className="overflow-hidden rounded-lg border border-blue-50 bg-blue-50/30">
          {!answerData?.answer ? (
            <Link
              href={`/question/${idx}/${slug}`}
              className="flex items-center justify-between p-5 transition-colors hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <PenLine className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="b2 font-medium text-blue-900">
                    아직 작성된 내 답변이 없습니다
                  </p>
                  <p className="text-xs text-blue-600">
                    나만의 답변을 작성하고 다른 사람과 비교해 보세요!
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </Link>
          ) : (
            <div className="p-5">
              <span className="c1 text-main-400 mb-2 font-bold tracking-wider">
                내 답변
              </span>
              <p className="b1 leading-relaxed text-gray-800">
                {answerData?.answer}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <HeaderTitleBox
          icon={Crown}
          title={'전체 답변 보기'}
          content={`총 ${answers?.length ?? 0}개의 답변이 있습니다.`}
        />
      </div>
    </div>
  );
};

export default QuestionAnswerStatus;
