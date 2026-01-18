'use client';
import { useState } from 'react';
import { Button } from './ui/button/Button';
import { Input } from './ui/input/Input';
import { jobCategories } from '@/constants/jobCategories';
import { cn } from '@/lib/utils';

const TagSearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('추천순');

  const sortOptions = ['추천순', '최신순'];

  return (
    <section className="container-col gap-8">
      {/* 카테고리 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000">카테고리</h5>

        <div className="c1 flex gap-3">
          {jobCategories.map((jobCategory) => (
            <Button
              key={jobCategory}
              onClick={() => setSelectedCategory(jobCategory)}
              variant={'none'}
              className={cn(
                'h-8.5 transition-colors',
                selectedCategory === jobCategory
                  ? 'bg-main-400 border-main-400 hover:bg-main-500400 text-white'
                  : 'border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-100/80 hover:text-gray-700',
              )}
            >
              {jobCategory}
            </Button>
          ))}
        </div>
      </article>

      {/* 보유 기술 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000">보유 기술</h5>
        <div className="relative">
          <Input
            className="c1 text-gray-1000 focus:ring-main-400 border-gray-200 bg-gray-100"
            type="text"
            placeholder="기술 스택을 입력해주세요 "
          />
        </div>
      </article>
      {/* 정렬 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000 mb-3">정렬</h5>
        <div className="flex w-full rounded-lg border border-gray-200 bg-gray-100 p-1">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedSort(option)}
              className={cn(
                'flex-1 cursor-pointer rounded-md py-2 text-sm font-bold transition-all',
                selectedSort === option
                  ? 'text-main-600 text-gray-1000 bg-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </article>
    </section>
  );
};

export default TagSearchBar;
