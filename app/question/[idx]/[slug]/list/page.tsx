import { useFetchAnswerQuestion } from '@/features/question/hooks/useFetchAnswerQuestion';
import QuestionListHeader from '@/features/question/components/QuestionListHeader';
import QuestionListAnswers from '@/features/question/components/QuestionListAnswers';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';

interface QuestionPageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const QuestionListPage = ({ idx, slug }: QuestionPageProps) => {
  // const comment = qustionCommentData.map((data) => data.comment);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QuestionListHeader idx={idx} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <QuestionListAnswers />
      </Suspense>
    </>
  );
};

export default QuestionListPage;
