// @/store/useFilterStore.ts
import { useState, useRef, useEffect } from 'react';
import { create } from 'zustand';
import { FilterType } from '@/features/question/type/FilterType';

interface FilterState {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  filterType: 'ALL',
  setFilterType: (type) => set({ filterType: type }),
}));

export const useFilter = () => {
  const filterType = useFilterStore((state) => state.filterType);
  const setFilterType = useFilterStore((state) => state.setFilterType);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = () => setIsFilterOpen((prev) => !prev);

  const handleFilterSelect = (type: FilterType) => {
    setFilterType(type);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen)
      document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  return {
    filterType,
    handleFilterSelect,
    isFilterOpen,
    handleFilterClick,
    filterRef,
  };
};
