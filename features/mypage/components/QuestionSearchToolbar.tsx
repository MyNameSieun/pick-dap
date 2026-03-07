'use client';

import Filter from '@/components/common/Filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/Input';
import { FILTER_OPTIONS } from '@/constants/selectOptions';
import { useQuestionFilters } from '@/features/question/hooks/question/useQuestionFilters';
import { QuestionWithDetails } from '@/features/question/services/question/fetchQuestion';
import { useDisclosure } from '@/hooks/useClickOutside';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface QuestionSearchToolbarProps {
  questions: QuestionWithDetails[];
}
const QuestionSearchToolbar = ({ questions }: QuestionSearchToolbarProps) => {
  const { onToggle } = useDisclosure();

  const { updateParams, ...filters } = useQuestionFilters();
  const [searchValue, setSearchValue] = useState(filters.searchQuery || '');

  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mb-5 flex items-center gap-3">
      <Input
        className="c1 bg-gray-100"
        placeholder="질문을 검색하세요"
        leftIcon={Search}
        autoFocus
        value={searchValue}
        onChange={handleChangeSearchValue}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
      />
      <Button onClick={handleSearchSubmit}>검색</Button>
      {/* <Filter
        options={FILTER_OPTIONS}
        filterType={filterType}
        handleFilterSelect={(value) => handleFilterSelect(value)}
        isFilterOpen={isFilterOpen}
        handleFilterClick={onToggle}
      /> */}
    </div>
  );
};

export default QuestionSearchToolbar;
