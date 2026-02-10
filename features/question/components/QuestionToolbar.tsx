'use client';

import Filter from '@/components/common/Filter';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import clsx from 'clsx';
import { Plus, Search } from 'lucide-react';
import { SetStateAction, useEffect } from 'react';
import { FilterType } from '../../../types/FilterType';
import { useDisclosure } from '@/hooks/useClickOutside';
import {
  useQuestionEditModalAction,
  useQuestionEditModalState,
} from '@/store/modal/useQuestionEditModal';

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'PENDING', label: '미답변' },
  { value: 'COMPLETED', label: '답변완료' },
];

interface QuestionToolbarProps {
  filterType: FilterType;
  handleFilterSelect: (value: FilterType) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchRef: React.RefObject<HTMLInputElement>;
  focusSearch: () => void;
  category: 'pickdap' | 'user';
  setCategory: React.Dispatch<SetStateAction<'pickdap' | 'user'>>;
}

const QuestionToolbar = ({
  filterType,
  handleFilterSelect,
  handleSearch,
  searchRef,
  focusSearch,
  category,
  setCategory,
}: QuestionToolbarProps) => {
  useEffect(() => {
    focusSearch();
  }, []);

  const {
    isOpen: isFilterOpen,
    onToggle: toggleFilter,
    onClose: closeFilter,
    containerRef,
  } = useDisclosure();

  const onSelect = (value: FilterType) => {
    handleFilterSelect(value);
    closeFilter();
  };

  const { openCreate } = useQuestionEditModalAction();

  return (
    <article className="mx-9">
      <section className="flex items-center justify-between border-gray-200">
        <div className="text-button-md relative flex h-12 gap-6 rounded-[12] border border-gray-200 bg-gray-100 p-2 font-bold">
          <div
            className={clsx(
              'absolute top-2 left-1 h-[calc(100%-12px)] w-[calc(50%-12px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out',
              category === 'pickdap'
                ? 'translate-x-0 text-blue-400'
                : 'text-gray-1000 translate-x-full',
            )}
          />

          {/* 버튼 */}
          <button
            type="button"
            className={clsx(
              'z-1 mr-2 flex-1 cursor-pointer px-6.5 py-1.5 transition',
              category === 'pickdap' ? 'text-blue-400' : 'text-gray-1000',
            )}
            onClick={() => {
              setCategory('pickdap');
            }}
          >
            픽답 추천 질문
          </button>
          <button
            type="button"
            className={clsx(
              'z-1 mr-6 flex-1 cursor-pointer px-6.5 py-1.5 transition',
              category === 'user' ? 'text-blue-400' : 'text-gray-1000',
            )}
            onClick={() => {
              setCategory('user');
            }}
          >
            유저 등록 질문
          </button>
        </div>

        <div className="text-button-sm relative flex items-center gap-2">
          <div ref={containerRef}>
            <Filter
              options={FILTER_OPTIONS}
              handleFilterClick={toggleFilter}
              handleFilterSelect={(value) => onSelect(value as FilterType)}
              isFilterOpen={isFilterOpen}
              filterType={filterType}
            />
          </div>

          <Button variant={'none'} className="h-9.5 px-6">
            질문 담기
          </Button>
          <Button variant={'default'} className="h-9.5" onClick={openCreate}>
            <div className="mx-2 flex items-center gap-1">
              <Plus /> 질문 등록
            </div>
          </Button>
        </div>
      </section>

      <section className="relative mt-2">
        <Input
          className="c1 text-gray-1000 h-10"
          type="text"
          placeholder="제목을 입력해주세요 "
          leftIcon={Search}
          onChange={handleSearch}
          ref={searchRef}
        />
      </section>
    </article>
  );
};

export default QuestionToolbar;
