'use client';
import TagSearchBar from '@/components/TagSearchBar';
import Loader from '@/components/ui/Loader';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';
import { useStatusFilters } from '@/features/mypage/hooks/useStatusFilters';
import { useFetchInfiniteQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const QuestionMain = () => {
  const { updateParams, rawParams, ...filters } = useStatusFilters();

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfiniteQuestionData(filters);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const savedQuestions = data?.pages.flatMap((page) => page);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending || !savedQuestions) return <Loader />;

  return (
    <main className="mx-auto flex w-full flex-col gap-3">
      <TagSearchBar />
      <section className="container-col">
        <QuestionSearchToolbar />

        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard questions={savedQuestions ?? []} />
        </div>
      </section>
      <div ref={ref} className="flex w-full items-center justify-center py-8">
        {isFetchingNextPage && <Loader />}
        {!hasNextPage && savedQuestions.length > 0 && (
          <p className="text-sm text-gray-400">모든 질문을 불러왔습니다.</p>
        )}
      </div>
    </main>
  );
};

export default QuestionMain;
