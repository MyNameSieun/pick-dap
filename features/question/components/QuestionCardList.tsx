// features/question/components/QuestionCardList.tsx
'use client';
import useFilter from '@/hooks/useFilter';
import { FilterType } from '../../../types/FilterType';
import QuestionCardItem from './QuestionCardItem';
import QuestionToolbar from './QuestionToolbar';
import useSearch from '@/hooks/useSearch';
import { useState } from 'react';
import { useFetchQuestionData } from '../hooks/useFetchQuestionData';

const QuestionCardList = () => {
  const { filterType, handleFilterSelect } = useFilter<FilterType>('ALL');

  const { focusSearch, handleSearch, searchRef } = useSearch();
  const [category, setCategory] = useState<'pickdap' | 'user'>('pickdap');

  const { data } = useFetchQuestionData();

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
        {data?.map((question) => (
          <QuestionCardItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
};

export default QuestionCardList;
