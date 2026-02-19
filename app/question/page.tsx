import TagSearchBar from '@/components/TagSearchBar';
import QuestionCardList from '../../features/question/components/QuestionCardList';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Loader from '@/components/ui/Loader';

export const metadata: Metadata = {
  title: '면접 질문',
  description: '면접 질문을 검색하고 등록할 수 있습니다.',
};

const QuestionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  return (
    <div className="mx-auto w-full">
      <TagSearchBar />
      <Suspense key={q || ''} fallback={<Loader />}>
        <QuestionCardList key={q || ''} />
      </Suspense>
    </div>
  );
};

export default QuestionPage;
