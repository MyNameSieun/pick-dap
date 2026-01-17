"use client";
import { useState, useRef, useEffect } from "react";

export const useFilter = <T extends string>(initialValue: T) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<T>(initialValue);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterSelect = (type: T) => {
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
    filterRef 
  };
};