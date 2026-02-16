'use client';
import useFilter from '@/hooks/useFilter';
import { FilterType } from '../../../types/FilterType';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import useSearch from '@/hooks/useSearch';
import { useState } from 'react';
import { useFetchQuestionData } from '../hooks/question/useFetchQuestionData';

const QuestionCardList = () => {
  const { filterType, handleFilterSelect } = useFilter<FilterType>('ALL');

  const { focusSearch, handleSearch, searchRef, searchQuery } = useSearch();
  const [category, setCategory] = useState<'pickdap' | 'user'>('pickdap');

  const { data: questions } = useFetchQuestionData();

  const filteredSearchData = questions?.filter((question) => {
    if (searchQuery.trim() === '') return true;
    const lowerQuery = searchQuery.toLowerCase().trim();

    const isTitleMatch = question.title.toLowerCase().includes(lowerQuery);
    // some: 배열 중 하나라도 만족한 게 있으면 true 반환
    const isTagMatch = question.tags.some((t) =>
      t.tag.label.toLowerCase().includes(lowerQuery),
    );
    return isTitleMatch || isTagMatch;
  });

  // 로딩/에러 로직 삭제 (부모의 Suspense/ErrorBoundary가 처리)
  return (
    <section className="flex flex-col gap-6.5 py-20">
      <QuestionToolbar
        filterType={filterType as FilterType}
        handleFilterSelect={handleFilterSelect}
        handleSearch={handleSearch}
        searchRef={searchRef as React.RefObject<HTMLInputElement>}
        focusSearch={focusSearch}
        category={category}
        setCategory={setCategory}
      />

      <ul className="mx-9 grid grid-cols-3 gap-5">
        {filteredSearchData?.map((question) => (
          <QuestionCardItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
};

export default QuestionCardList;
