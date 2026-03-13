'use client';

import { useState } from 'react';
import { Button } from './ui/button/Button';
import { Input } from './ui/input/Input';
import { cn } from '@/lib/utils';
import { Check, Search, X, Hash, Layers, LayoutGrid } from 'lucide-react';
import { useDisclosure } from '@/hooks/useClickOutside';
import { ALL_CATEGORIES } from '@/constants/jobCategories';
import { useTechStackData } from '@/hooks/useTechStackData';
import { useQuestionFilters } from '@/features/question/hooks/question/useQuestionFilters';

const TagSearchBar = () => {
  const { containerRef, onClose, isOpen, onOpen } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');

  const { category, techs, sort, updateParams } = useQuestionFilters();
  const { data: techStack = [] } = useTechStackData();

  const selectedTechSlugs = techs ? techs.split(',') : [];
  const selectedTechNames = selectedTechSlugs.map((slug) => {
    const tech = techStack.find((t) => t.slug === slug);
    return tech ? tech.name : slug;
  });

  const filteredTech = techStack.filter((tech) =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectTech = (slug: string) => {
    if (selectedTechSlugs.includes(slug)) return;
    if (selectedTechSlugs.length >= 3)
      return alert('최대 3개까지 선택 가능합니다.');

    const newTechs = [...selectedTechSlugs, slug];
    updateParams({ techs: newTechs.join(',') });
    setSearchTerm('');
    onClose();
  };

  const handleRemoveTech = (slug: string) => {
    const newTechs = selectedTechSlugs.filter((s) => s !== slug);
    updateParams({ techs: newTechs.length > 0 ? newTechs.join(',') : null });
  };

  const sortOption = [
    { label: '추천순', value: 'popular' },
    { label: '최신순', value: 'latest' },
  ];

  return (
    <section className="flex flex-col gap-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <article className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-gray-900">
          <LayoutGrid size={18} className="text-blue-500" />
          <h5 className="text-sm font-bold tracking-tight">카테고리</h5>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((job) => {
            const isActive = category === job;
            return (
              <Button
                key={job}
                onClick={() => updateParams({ category: job })}
                variant="none"
                className={cn(
                  'h-9 rounded-full px-5 text-[13px] font-bold transition-all active:scale-95',
                  isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-600'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100',
                )}
              >
                {job === 'ALL' ? '전체' : job}
              </Button>
            );
          })}
        </div>
      </article>

      <article className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <Hash size={18} className="text-main-500" />
            <h5 className="text-sm font-bold">기술 스택</h5>
          </div>
          <span className="text-[11px] font-medium text-gray-600">
            최대 3개 선택
          </span>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="relative">
            <Input
              className="h-12 w-full rounded-2xl border-gray-100 bg-gray-50 pl-11 text-sm text-gray-900 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              type="text"
              placeholder="관심 있는 기술을 검색하고 추가해보세요"
              value={searchTerm}
              onClick={onOpen}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {selectedTechSlugs.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-1 mt-4 flex flex-wrap gap-2">
              {selectedTechSlugs.map((slug, index) => (
                <div
                  key={slug}
                  className="flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/50 py-1.5 pr-2 pl-3 text-[12px] font-bold text-blue-700"
                >
                  {selectedTechNames[index]}
                  <button
                    onClick={() => handleRemoveTech(slug)}
                    className="flex h-4 w-4 items-center justify-center rounded-md transition-colors hover:bg-blue-200/50"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isOpen && (
            <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-3 max-h-64 w-full overflow-y-auto rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl duration-200">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {filteredTech.length > 0 ? (
                  filteredTech.map((tech) => {
                    const isSelected = selectedTechSlugs.includes(tech.slug);
                    return (
                      <button
                        key={tech.id}
                        onClick={() => handleSelectTech(tech.slug)}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-[13px] transition-all',
                          isSelected
                            ? 'text-main-400 bg-blue-50 font-bold'
                            : 'text-gray-600 hover:bg-gray-50',
                        )}
                      >
                        {tech.name}
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-full py-10 text-center text-sm font-medium text-gray-400">
                    일치하는 기술이 없습니다.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </article>

      <article className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-gray-900">
          <Layers size={18} className="text-blue-500" />
          <h5 className="text-sm font-bold tracking-tight">정렬</h5>
        </div>
        <div className="flex w-full rounded-2xl border border-gray-100 bg-gray-50 p-1.5">
          {sortOption.map((option) => (
            <button
              key={option.value}
              onClick={() => updateParams({ sort: option.value })}
              className={cn(
                'flex-1 rounded-xl py-2.5 text-[13px] font-bold transition-all duration-200',
                sort === option.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </article>
    </section>
  );
};

export default TagSearchBar;
