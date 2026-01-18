"use client";
import useFilter from '@/hooks/useFilter';
import { FilterType } from '../../../types/FilterType';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import questionData from '@/data/questionData.json';

const QuestionCardList = () => {
  const { filterType, handleFilterClick, handleFilterSelect, isFilterOpen } = useFilter<FilterType>('ALL');

  const filteredQuestions = questionData.filter((q) => {
    if (filterType === 'ALL') return true;

    const filterMap: Record<string, string> = {
      PENDING: '미답변',
      COMPLETED: '답변 완료',
    };

    return q.status === filterMap[filterType];
  });

  return (
    <section className="flex flex-col gap-6.5 py-20">
      <QuestionToolbar filterType={filterType as FilterType} handleFilterClick={handleFilterClick} handleFilterSelect={handleFilterSelect} isFilterOpen={isFilterOpen} />

      <ul className="mx-9 grid grid-cols-3 gap-5">
        {filteredQuestions.map((question) => (
          <QuestionCardItem key={question.id} question={question}  />
        ))}
      </ul>
    </section>
  );
};

export default QuestionCardList;
