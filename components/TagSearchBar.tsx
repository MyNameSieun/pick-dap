'use client';
import { useState } from 'react';
import { Button } from './ui/button/Button';
import { Input } from './ui/input/Input';
import { jobCategories } from '@/constants/jobCategories';
import { cn } from '@/lib/utils';
import { TECH_STACK_LIST } from '@/constants/techStackData';
import { Check } from 'lucide-react';
import { useDisclosure } from '@/hooks/useClickOutside';

const TagSearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('추천순');

  const [seletedTechList, setSeletedTechList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { containerRef, onClose, isOpen, onOpen } = useDisclosure();

  const filteredTech = TECH_STACK_LIST.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortOptions = ['추천순', '최신순'];

  const handleSelectTech = (tech: string) => {
    if (seletedTechList.includes(tech)) return;
    if (seletedTechList.length >= 3) {
      alert('기술 스택은 최대 3개까지만 선택 가능합니다.');
      return;
    }

    setSeletedTechList((prev) => [...prev, tech]);
    onClose();
  };

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

      {/* 기술 스택 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000">기술 스택</h5>
        <div className="relative" ref={containerRef}>
          <Input
            className="c1 text-gray-1000 focus:ring-main-400 border-gray-200 bg-gray-100"
            type="text"
            placeholder="기술 스택을 입력해주세요"
            onClick={onOpen}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* 선택된 배지들 */}
          <div className="mt-3 flex flex-wrap gap-2">
            {seletedTechList.map((tech) => (
              <span
                key={tech}
                className="bg-main-400 flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white"
              >
                {tech}
                <button
                  onClick={() =>
                    setSeletedTechList(
                      seletedTechList.filter((t) => t !== tech),
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {isOpen && (
            <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-xl duration-200">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {filteredTech.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleSelectTech(tech)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all',
                      seletedTechList.includes(tech)
                        ? 'bg-main-50 text-main-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    {tech}
                    {seletedTechList.includes(tech) && (
                      <span className="text-xs">
                        <Check size={15} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
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
