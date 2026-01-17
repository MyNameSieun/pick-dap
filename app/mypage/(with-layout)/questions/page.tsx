'use client';
import Filter from '@/components/common/Filter';
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import { Input } from '@/components/ui/input/Input';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import { FilterType } from '@/features/question/type/FilterType';
import { useFilter } from '@/store/useFilterStore';
import { Search } from 'lucide-react';

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'PENDING', label: '답변 대기' },
  { value: 'COMPLETED', label: '답변 완료' },
];

const MypageQuestionsPage = () => {
  const {
    filterType,
    filterRef,
    handleFilterClick,
    handleFilterSelect,
    isFilterOpen,
  } = useFilter();

  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col" ref={filterRef}>
        <div className="mb-5 flex items-center gap-3">
          <Input
            className="c1 bg-gray-100"
            placeholder="질문을 검색하세요"
            leftIcon={Search}
          />
          <Filter
            options={FILTER_OPTIONS}
            filterType={filterType}
            handleFilterClick={handleFilterClick}
            handleFilterSelect={(value) =>
              handleFilterSelect(value as FilterType)
            }
            isFilterOpen={isFilterOpen}
          />
        </div>

        <Line my={4} />
        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
