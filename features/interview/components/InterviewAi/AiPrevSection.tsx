'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { jobCategories } from '@/constants/jobCategories';

const AiPrevSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('FrontEnd');
  const categories = jobCategories.filter((v) => v != '전체');

  return (
    <>
      <div className={twMerge('container-col', 'w-2/5 gap-8 p-8')}>
        <h5 className="h5 text-black">질문 생성 옵션</h5>
        <article className="flex flex-col gap-3">
          <p className="b2 text-gray-1000">
            카테고리 <span className="text-point-star">*</span>
          </p>
          <div className="c1 grid grid-cols-2 gap-2.5">
            {categories.map((v, i) => (
              <Button
                key={i}
                onClick={() => setSelectedCategory(v)}
                variant="white"
                className={cn(
                  'h-12 transition-colors',
                  selectedCategory === v
                    ? 'bg-highlight-light border-highlight-deep hover:bg-main-100 text-highlight-deep hover:text-main-400'
                    : 'bg-bg-light border-gray-500 text-gray-600 hover:bg-gray-100/80 hover:text-gray-700',
                )}
              >
                {v}
              </Button>
            ))}
          </div>
        </article>
        <article className="flex flex-col gap-3">
          <p className="b2 text-gray-1000">보유 기술</p>
          <div className="relative">
            <Input
              className="c1 text-gray-1000 focus:ring-main-500 pl-10"
              type="text"
              placeholder="기술 스택을 입력해주세요 "
            />
            <Search className="text-icon-default absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </article>
        <article className="flex flex-col gap-3">
          <p className="b2 text-gray-1000">커스텀 주제</p>
          <Input
            className="c1 text-gray-1000 focus:ring-main-500"
            type="text"
            placeholder="예: React Hooks, Spring boot"
          />
          <p className="c2 text-gray-700">
            특정 주제에 대한 질문을 생성하고 싶다면 입력하세요
          </p>
        </article>
        <article className="flex flex-col gap-3">
          <p className="b2 text-gray-1000">회사별 맞춤 질문 생성</p>
          <Input
            className="c1 text-gray-1000 focus:ring-main-500"
            type="text"
            placeholder="채용 공고 URL 입력하기"
          />
          <p className="c2 text-gray-700">
            URL이 없으신가요?
            <Button variant="link" size="xs" className="c2 h-fit">
              직접 입력하기
            </Button>
          </p>
        </article>
        <Button size="lg" className="font-bold">
          AI 질문 생성하기
        </Button>
      </div>
    </>
  );
};
export default AiPrevSection;
