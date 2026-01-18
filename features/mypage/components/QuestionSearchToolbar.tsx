'use client';

import Filter from "@/components/common/Filter";
import { Input } from "@/components/ui/input/Input"
import { FilterType } from "@/features/question/type/FilterType";
import { Search } from "lucide-react"

interface QuestionSearchToolbarProps {
    filterType: FilterType;
    handleFilterClick: () => void;
    handleFilterSelect: (value: FilterType) => void;
    isFilterOpen: boolean;
}

const QuestionSearchToolbar = ({ filterType, handleFilterClick, handleFilterSelect, isFilterOpen }: QuestionSearchToolbarProps) => {
    const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
        { value: 'ALL', label: '전체' },
        { value: 'PENDING', label: '답변 대기' },
        { value: 'COMPLETED', label: '답변 완료' },
      ];
      
  return (
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
  )
}

export default QuestionSearchToolbar