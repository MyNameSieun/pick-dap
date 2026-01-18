import { useRef, useState } from 'react';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // 검색 입력 시 검색어 변경
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색 입력 시 검색 필드 포커스
  const focusSearch = () => {
    searchRef.current?.focus();
  };

  return { searchQuery, handleSearch, searchRef, focusSearch };
};

export default useSearch;
