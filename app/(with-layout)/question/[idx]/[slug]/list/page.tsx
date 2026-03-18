import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import AnswersList from '@/features/question/components/list/AnswersList';
import QuestionAnswerStatus from '@/features/question/components/list/QuestionAnswerStatus';

interface QuestionPageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const QuestionListPage = async ({ params }: QuestionPageProps) => {
  const { idx, slug } = await params;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QuestionAnswerStatus idx={idx} slug={slug} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <AnswersList idx={idx} />
      </Suspense>
    </>
  );
};

export default QuestionListPage;
