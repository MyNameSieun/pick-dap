import QuestionHeader from '../../../features/question/components/QuestionHeader';
import BackButton from '@/components/common/BackButton';
import Loader from '@/components/ui/Loader';
import QuestionDetail from '@/features/question/components/QuestionDetail';
import { Suspense } from 'react';

const QuestionPage = () => {
  return (
    <div className="flex flex-col">
      <BackButton label={'뒤로가기'} />
      <Suspense fallback={<Loader />}>
        <QuestionHeader />
        <QuestionDetail />
      </Suspense>
    </div>
  );
};

export default QuestionPage;
