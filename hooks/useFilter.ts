import { useRef, useState } from 'react';

const useFilter = <T extends string>(initialType: T) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<T>(initialType);
  const filterRef = useRef<HTMLDivElement>(null);

  // filter 버튼 클릭 시 필터 타입 변경
  const handleFilterSelect = (value: T) => {
    setFilterType(value);
    setIsFilterOpen(false);
  };

  return {
    isFilterOpen,
    setIsFilterOpen,
    filterType,
    handleFilterSelect,
    filterRef,
  };
};

export default useFilter;
