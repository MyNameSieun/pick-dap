'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Plus, Search } from 'lucide-react';

import Filter from '@/components/common/Filter';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useDisclosure } from '@/hooks/useClickOutside';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';
import { useState } from 'react';
import { useSession } from '@/store/session';
import { useQuestionFilters } from '../hooks/question/useQuestionFilters';
import { FILTER_OPTIONS } from '@/constants/selectOptions';

const QuestionToolbar = () => {
  const user = useSession()?.user;

  const router = useRouter();

  const { updateParams, ...filters } = useQuestionFilters();

  const [searchValue, setSearchValue] = useState(filters.searchQuery || '');

  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  const { openCreate } = useQuestionEditModalAction();

  const handleOpenEditModal = () => {
    if (!user) {
      const currentPath = window.location.pathname;
      return router.push(`/login?returnTo=${encodeURIComponent(currentPath)}`);
    }

    openCreate();
  };
  const currentStatusLabel =
    FILTER_OPTIONS.find((option) => option.value === filters.status)?.label ||
    '전체';
  const {
    isOpen: isFilterOpen,
    onToggle: toggleFilter,
    onClose: closeFilter,
    containerRef,
  } = useDisclosure();

  return (
    <article className="mx-9 mt-[-20px] flex flex-col gap-4">
      <section className="flex items-center justify-between">
        <div className="relative flex h-11 w-[320px] items-center rounded-xl bg-gray-100 p-1 font-bold">
          <div
            className={clsx(
              'absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-white shadow-sm transition-all duration-300 ease-out',
              filters.type === 'pickdap' ? 'translate-x-0' : 'translate-x-full',
            )}
          />
          <button
            type="button"
            className={clsx(
              'z-10 flex-1 cursor-pointer text-sm transition-colors duration-200',
              filters.type === 'pickdap'
                ? 'text-blue-500'
                : 'text-gray-600 hover:text-gray-700',
            )}
            onClick={() => updateParams({ type: 'pickdap' })}
          >
            픽답 추천
          </button>
          <button
            type="button"
            className={clsx(
              'z-10 flex-1 cursor-pointer text-sm transition-colors duration-200',
              filters.type === 'user'
                ? 'text-blue-500'
                : 'text-gray-600 hover:text-gray-700',
            )}
            onClick={() => updateParams({ type: 'user' })}
          >
            유저 등록
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div ref={containerRef} className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-gray-700">
              {currentStatusLabel}
            </span>
            <Filter
              options={FILTER_OPTIONS}
              handleFilterClick={toggleFilter}
              handleFilterSelect={(value) => {
                updateParams({ status: value });
                closeFilter();
              }}
              isFilterOpen={isFilterOpen}
              filterType={filters.status}
            />
          </div>

          {/* <Button
            variant="ghost"
            className="h-10 px-4 text-gray-600 hover:bg-gray-100"
          >
            질문 담기
          </Button> */}

          <Button
            variant="default"
            className="h-10 bg-blue-500 px-5 shadow-sm transition-transform hover:bg-blue-600 active:scale-95"
            onClick={handleOpenEditModal}
          >
            <Plus size={18} className="mr-1" />
            <span className="text-sm">질문 등록</span>
          </Button>
        </div>
      </section>
      <section className="group relative">
        <Input
          className="h-12 w-full rounded-xl border-gray-200 bg-white pr-28 text-sm shadow-sm transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          type="text"
          placeholder="관심 있는 면접 질문을 검색해보세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
        <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
          <Button
            onClick={handleSearchSubmit}
            className="h-9 rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-600"
          >
            <Search size={18} className="mr-1.5" />
            검색
          </Button>
        </div>
      </section>
    </article>
  );
};
export default QuestionToolbar;
