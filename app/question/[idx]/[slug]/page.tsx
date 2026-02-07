import { Suspense } from 'react';
import QuestionHeader from '@/features/question/components/QuestionHeader';
import QuestionDetail from '@/features/question/components/QuestionDetail';

interface PageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const QuestionPage = async ({ params }: PageProps) => {
  const { idx, slug } = await params;

  return (
    <div className="flex flex-col">
      <Suspense fallback={<div>질문을 불러오는 중...</div>}>
        <QuestionHeader idx={idx} slug={slug} />
        <QuestionDetail idx={idx} slug={slug} />
      </Suspense>
    </div>
  );
};

export default QuestionPage;
