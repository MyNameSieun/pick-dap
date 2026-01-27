import { useEffect, useRef, useState } from 'react';

const useFilter = <T extends string>(initialType: T) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<T>(initialType);
  const filterRef = useRef<HTMLDivElement>(null);

  // filter 버튼 클릭 시 필터 오픈/닫기
  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // filter 버튼 클릭 시 필터 타입 변경
  const handleFilterSelect = (value: T) => {
    setFilterType(value);
    setIsFilterOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
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

  return {
    isFilterOpen,
    filterType,
    handleFilterClick,
    handleFilterSelect,
    filterRef,
  };
};

export default useFilter;
