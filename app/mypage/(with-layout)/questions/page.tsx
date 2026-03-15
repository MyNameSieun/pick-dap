'use client';
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import Loader from '@/components/ui/Loader';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';
import { useStatusFilters } from '@/features/mypage/hooks/useStatusFilters';
import { useFetchMySaveQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';

const MypageQuestionsPage = () => {
  const statusFilter = useStatusFilters();

  const { data: savedQuestions, isPending } =
    useFetchMySaveQuestionData(statusFilter);

  if (isPending) return <Loader />;

  return (
    <main className="mx-auto flex w-full flex-col gap-3">
      <TagSearchBar />

      <section className="container-col">
        <QuestionSearchToolbar />

        <Line my={1} />
        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard questions={savedQuestions ?? []} />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
