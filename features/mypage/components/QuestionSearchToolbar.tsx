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
    <div className="mx-auto mb-8 w-full">
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
        </div>
        <input
          type="text"
          className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 pr-4 pl-12 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
          placeholder="질문을 검색하세요"
          autoFocus
          value={searchValue}
          onChange={handleChangeSearchValue}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
      </div>
    </div>
  );
};

export default QuestionSearchToolbar;
