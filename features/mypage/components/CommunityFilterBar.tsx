'use client';

import { useState, useRef, useEffect } from 'react';
import SelectCustom from '@/components/common/SelectCustom';
import useMyPageCommunityFilters from '../hooks/useMyPageCommunityFilters';
import { useFetchPostCategory } from '@/features/community/hooks/useFetchPostCategory';
import Filter from '@/components/common/Filter';

const CommunityFilterBar = () => {
  const { category, sort, updateParams } = useMyPageCommunityFilters();
  const { data: postCategories } = useFetchPostCategory();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  const categoryOptions =
    postCategories?.map((p) => ({ label: p.name, value: p.slug })) || [];

  const SORT_OPTIONS = [
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'likes' },
    { label: '조회순', value: 'views' },
  ];
  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sort)?.label || '최신순';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="flex items-center justify-between border-b border-gray-50/50 px-4 pt-6">
      <SelectCustom
        options={categoryOptions}
        allLabel="전체"
        value={category}
        onValueChange={(val) => updateParams({ category: val })}
        className="w-fit border-none bg-transparent p-0 text-[15px] font-extrabold text-gray-800 shadow-none focus:ring-0"
      />

      <div ref={filterRef} className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-gray-800">
          {currentSortLabel}
        </span>
        <Filter
          options={SORT_OPTIONS}
          isFilterOpen={isFilterOpen}
          filterType={sort}
          handleFilterClick={() => setIsFilterOpen(!isFilterOpen)}
          handleFilterSelect={(value) => {
            updateParams({ sort: value });
            setIsFilterOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default CommunityFilterBar;
