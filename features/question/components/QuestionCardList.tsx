'use client';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import { useFetchQuestionData } from '../hooks/question/useFetchQuestionData';
import Paging from '@/components/common/Paging';
import { useSearchParams } from 'next/navigation';
import { CategoryTypeEnums, QuestionType, StatusEnums } from '@/types/entity';
import Loader from '@/components/ui/Loader';

const QuestionCardList = () => {
  const searchParams = useSearchParams();

  // 1. URL에서 모든 필터 상태를 실시간으로 가져옴
  const filters = {
    type: (searchParams.get('type') as QuestionType) || undefined,
    status: (searchParams.get('status') as StatusEnums) || 'ALL',
    category:
      (searchParams.get('category') as CategoryTypeEnums | 'ALL') || 'ALL',
    searchQuery: searchParams.get('q') || undefined,
    techs: searchParams.get('techs') || undefined,
    sort: (searchParams.get('sort') as 'latest' | 'popular') || 'popular',
  };

  // 서버 측 필터링을 위해 현재 상태값들을 훅에 전달
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
