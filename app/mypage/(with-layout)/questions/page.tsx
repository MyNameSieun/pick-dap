'use client';
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import Loader from '@/components/ui/Loader';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';
import { useFetchMySaveQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { useQuestionFilters } from '@/features/question/hooks/question/useQuestionFilters';

const MypageQuestionsPage = () => {
  const filters = useQuestionFilters();

  const { data: savedQuestions, isPending } =
    useFetchMySaveQuestionData(filters);

  if (isPending) return <Loader />;

  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col">
        <QuestionSearchToolbar questions={savedQuestions!} />

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
