'use client';
import useFilter from '@/hooks/useFilter';
import { FilterType } from '../../../types/FilterType';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import questionData from '@/data/questionData.json';
import useSearch from '@/hooks/useSearch';

const QuestionCardList = () => {
  const { filterType, handleFilterClick, handleFilterSelect, isFilterOpen } =
    useFilter<FilterType>('ALL');

  const { searchQuery, focusSearch, handleSearch, searchRef } = useSearch();

  const filteredQuestions = questionData.filter((q) => {
    // 상태 필터
    const filterMap: Record<string, string> = {
      PENDING: '미답변',
      COMPLETED: '답변 완료',
    };

    // 검색 필터
    const matchesStatus =
      filterType === 'ALL' || q.status === filterMap[filterType];
    const matchesSearch = q.title
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  return (
    <section className="flex flex-col gap-6.5 py-20">
      <QuestionToolbar
        filterType={filterType as FilterType}
        handleFilterClick={handleFilterClick}
        handleFilterSelect={handleFilterSelect}
        isFilterOpen={isFilterOpen}
        handleSearch={handleSearch}
        searchRef={searchRef as React.RefObject<HTMLInputElement>}
        focusSearch={focusSearch}
      />

      <ul className="mx-9 grid grid-cols-3 gap-5">
        {filteredQuestions.map((question) => (
          <QuestionCardItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
};

export default QuestionCardList;
