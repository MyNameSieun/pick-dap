'use client';

import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Crown } from 'lucide-react';
import { useFetchAnswerForQuestion } from '../hooks/useFetchAnswerQuestion';
import { useSession } from '@/store/session';
import QuestionContentHeader from './QuestionContentHeader';
import { useFetchQuestionDataByIdx } from '../hooks/useFetchQuestionData';

const QuestionListHeader = ({ idx }: { idx: string }) => {
  const { data: question } = useFetchQuestionDataByIdx(Number(idx));
  const { data: answers } = useFetchAnswerForQuestion(question?.id);
  const auth = useSession();
  const userId = auth?.user?.id;
  const isAuthor = question?.author?.id === userId;

  return (
    <div>
      <BackButton label={'질문으로 돌아가기'} />
      <div className="rounded-[4px] border border-gray-100 bg-white p-8 shadow-sm">
        <QuestionContentHeader question={question} isAuthor={isAuthor} />
        <div className="b1 mt-[-20px] mb-2 rounded-sm border border-gray-300 bg-gray-100 px-3 py-5">
          프로세스는 운영체제 내의 작업의 한 단위이고, 스레드는 그것보다 더 작은
          단위입니다.
        </div>
      </div>

      <div className="text-gray-1000 b1 mt-15.5 mb-6">
        <HeaderTitleBox
          icon={Crown}
          title={'다른 사람 답변 비교'}
          content={`총 ${answers?.length ?? 0}개의 답변이 있습니다.`}
        />
      </div>
    </div>
  );
};

export default QuestionListHeader;
