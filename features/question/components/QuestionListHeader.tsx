'use client';

import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Crown } from 'lucide-react';
import {
  useFetchAnswerForQuestion,
  useFetchAnswerQuestionById,
} from '../hooks/useFetchAnswerQuestion';

const QuestionListHeader = ({ idx }: { idx: string }) => {
  const { data: question } = useFetchAnswerQuestionById(idx);
  const { data: answers } = useFetchAnswerForQuestion(
    question?.question_id as string,
  );
  return (
    <div>
      <BackButton label={'질문으로 돌아가기'} />
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
