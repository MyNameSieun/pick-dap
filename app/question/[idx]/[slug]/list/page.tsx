import QuestionListHeader from '@/features/question/components/QuestionListHeader';
import QuestionListAnswers from '@/features/question/components/AnswersList';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';

interface QuestionPageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const QuestionListPage = async ({ params }: QuestionPageProps) => {
  const { idx, slug } = await params;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QuestionListHeader idx={idx} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <QuestionListAnswers idx={idx} />
      </Suspense>
    </>
  );
};

export default QuestionListPage;
