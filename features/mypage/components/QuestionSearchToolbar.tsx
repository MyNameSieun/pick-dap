'use client';

import Filter from '@/components/common/Filter';
import { Input } from '@/components/ui/input/Input';
import { FILTER_OPTIONS } from '@/constants/selectOptions';
import { useDisclosure } from '@/hooks/useClickOutside';
import { Search } from 'lucide-react';
import { useEffect } from 'react';

interface QuestionSearchToolbarProps {
  searchRef: React.Ref<HTMLInputElement>;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focusSearch: () => void;

  filterType: string;
  handleFilterSelect: (value: string) => void;
  isFilterOpen: boolean;
}
const QuestionSearchToolbar = ({
  focusSearch,
  searchRef,
  searchQuery,
  handleSearch,
  filterType,
  handleFilterSelect,
  isFilterOpen,
}: QuestionSearchToolbarProps) => {
  const { onToggle } = useDisclosure();

  useEffect(() => {
    focusSearch();
  }, []);

  return (
    <div className="mb-5 flex items-center gap-3">
      <Input
        className="c1 bg-gray-100"
        placeholder="질문을 검색하세요"
        leftIcon={Search}
        value={searchQuery}
        onChange={handleSearch}
        ref={searchRef}
      />
      <Filter
        options={FILTER_OPTIONS}
        filterType={filterType}
        handleFilterSelect={(value) => handleFilterSelect(value)}
        isFilterOpen={isFilterOpen}
        handleFilterClick={onToggle}
      />
    </div>
  );
};

export default QuestionSearchToolbar;
