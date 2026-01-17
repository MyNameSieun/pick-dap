'use client';

import Filter from '@/components/common/Filter';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useFilter } from '@/hooks/useFilter';
import clsx from 'clsx';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

type FilterType = 'all' | 'unanswered' | 'answered';
const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'unanswered', label: '미답변' },
  { value: 'answered', label: '답변완료' },
];

const QuestionToolbar = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    filterRef,
    handleFilterClick,
    handleFilterSelect,
    isFilterOpen,
    filterType,
  } = useFilter<FilterType>('all');

  return (
    <article className="mx-9">
      <section className="flex items-center justify-between border-gray-200">
        <div className="text-button-md relative flex h-12 gap-6 rounded-[12] border border-gray-200 bg-gray-100 p-2 font-bold">
          <div
            className={clsx(
              'absolute top-2 left-1 h-[calc(100%-12px)] w-[calc(50%-12px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out',
              isActive
                ? 'translate-x-0 text-blue-400'
                : 'text-gray-1000 translate-x-full',
            )}
          />

          {/* 버튼 */}
          <button
            type="button"
            onClick={() => setIsActive(true)}
            className={clsx(
              'z-1 mr-2 flex-1 cursor-pointer px-6.5 py-1.5 transition',
              isActive ? 'text-blue-400' : 'text-gray-1000',
            )}
          >
            픽답 추천 질문
          </button>
          <button
            type="button"
            onClick={() => setIsActive(false)}
            className={clsx(
              'z-1 mr-6 flex-1 cursor-pointer px-6.5 py-1.5 transition',
              isActive ? 'text-gray-1000' : 'text-blue-400',
            )}
          >
            유저 등록 질문
          </button>
        </div>

        <div
          className="text-button-sm relative flex items-center gap-2"
          ref={filterRef}
        >
          <Filter
            options={FILTER_OPTIONS}
            handleFilterClick={handleFilterClick}
            handleFilterSelect={(value) =>
              handleFilterSelect(value as   FilterType)
            }
            isFilterOpen={isFilterOpen}
            filterType={filterType}
          />

          <Button variant={'none'} className="h-9.5 px-6">
            질문 담기
          </Button>
          <Button variant={'default'} className="h-9.5">
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
          placeholder="기술 스택을 입력해주세요 "
          leftIcon={Search}
        />
      </section>
    </article>
  );
};

export default QuestionToolbar;
