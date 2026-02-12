import { Suspense } from 'react';
import QuestionHeader from '@/features/question/components/QuestionHeader';
import QuestionDetail from '@/features/question/components/QuestionDetail';
import Loader from '@/components/ui/Loader';

interface PageProps {
  params: Promise<{ idx: number; slug: string }>;
}

const QuestionPage = async ({ params }: PageProps) => {
  const { idx, slug } = await params;
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <QuestionHeader idx={idx} slug={slug} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <QuestionDetail idx={idx} slug={slug} />
      </Suspense>
    </div>
  );
};

export default QuestionPage;
