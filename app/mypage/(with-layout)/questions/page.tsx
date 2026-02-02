'use client';
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';
import { FilterType } from '@/types/FilterType';
import useFilter from '@/hooks/useFilter';
import useSearch from '@/hooks/useSearch';

const MypageQuestionsPage = () => {
  const { filterType, handleFilterSelect, isFilterOpen  , } =
    useFilter<FilterType>('ALL');

  const { searchQuery, handleSearch, searchRef, focusSearch } = useSearch();

  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col">
        <QuestionSearchToolbar
          focusSearch={focusSearch}
          searchRef={searchRef}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          filterType={filterType as FilterType}
          handleFilterSelect={handleFilterSelect}
          isFilterOpen={isFilterOpen}
        />

        <Line my={4} />
        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard
            searchQuery={searchQuery}
            filterType={filterType as FilterType}
          />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
