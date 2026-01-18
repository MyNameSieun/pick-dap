"use client";
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';
import { FilterType } from '@/features/question/type/FilterType';
import useFilter from '@/hooks/useFilter';


const MypageQuestionsPage = () => {
  const {
    filterType,
    handleFilterClick,
    handleFilterSelect,
    isFilterOpen,
  } = useFilter<FilterType>('ALL');

  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col" >
       <QuestionSearchToolbar filterType={filterType as FilterType} handleFilterClick={handleFilterClick} handleFilterSelect={handleFilterSelect} isFilterOpen={isFilterOpen} />

        <Line my={4} />
        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard filterType={filterType as FilterType} />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
