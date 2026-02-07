import TagSearchBar from '@/components/TagSearchBar';
import QuestionCardList from '../../features/question/components/QuestionCardList';
import Paging from '@/components/common/Paging';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import { Metadata } from 'next';

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

      <Suspense key={q || ''} fallback={<Loader className="animate-spin" />}>
        <QuestionCardList key={q || ''} />
      </Suspense>
      <Paging />
    </div>
  );
};

export default QuestionPage;
