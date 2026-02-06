import TagSearchBar from '@/components/TagSearchBar';
import QuestionCardList from '../../features/question/components/QuestionCardList';
import Paging from '@/components/common/Paging';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

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
