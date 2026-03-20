import { Suspense } from 'react';
import QuestionHeader from '@/features/question/components/QuestionHeader';
import QuestionDetail from '@/features/question/components/QuestionDetail';
import Loader from '@/components/ui/Loader';

interface PageProps {
  params: Promise<{ idx: string; slug: string }>;
}
export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return {
    title: {
      absolute: `면접 질문 - ${decodedSlug}`,
    },
  };
};

const QuestionPage = async ({ params }: PageProps) => {
  const { idx, slug } = await params;
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <QuestionHeader idx={idx} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <QuestionDetail idx={idx} slug={slug} />
      </Suspense>
    </div>
  );
};

export default QuestionPage;
