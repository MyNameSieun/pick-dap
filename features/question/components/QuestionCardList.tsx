'use client';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import { useFetchQuestionData } from '../hooks/question/useFetchQuestionData';
import Paging from '@/components/common/Paging';
import Loader from '@/components/ui/Loader';
import { useQuestionFilters } from '../hooks/question/useQuestionFilters';

const QuestionCardList = () => {
  const filters = useQuestionFilters();
  const { data: questions, isLoading: isQuestionsLoading } =
    useFetchQuestionData(filters);

  if (isQuestionsLoading) return <Loader />;

  return (
    <section className="flex flex-col gap-6.5 py-20">
      <QuestionToolbar />

      <ul className="mx-9 grid grid-cols-3 gap-5">
        {questions?.map((question) => (
          <QuestionCardItem key={question.id} question={question} />
        ))}
      </ul>
      {/* 페이징 기능은 나중에 */}
      <Paging />
    </section>
  );
};

export default QuestionCardList;
