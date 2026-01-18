import { useState } from "react";

const useFilter =<T extends string> (initialType:T) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterType, setFilterType] = useState<T>(initialType);

    // filter 버튼 클릭 시 필터 오픈/닫기
    const handleFilterClick=()=>{
        setIsFilterOpen(prev=>!prev);
    }

    // filter 버튼 클릭 시 필터 타입 변경
    const handleFilterSelect=(value:T)=>{
        setFilterType(value);
        setIsFilterOpen(false);
    }

    return {
        isFilterOpen,
        filterType,
        handleFilterClick,
        handleFilterSelect,
    }
}

export default useFilter