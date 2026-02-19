'use client';
import { useMemo, useState } from 'react';
import { Button } from './ui/button/Button';
import { Input } from './ui/input/Input';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useDisclosure } from '@/hooks/useClickOutside';
import { useRouter, useSearchParams } from 'next/navigation';
import { ALL_CATEGORIES } from '@/constants/jobCategories';
import { useTechStackData } from '@/hooks/useTechStackData';

const TagSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { containerRef, onClose, isOpen, onOpen } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');

  // 1. URL에서 현재 상태 읽기
  const currentCategory = searchParams.get('category') || '전체';
  const currentSort = searchParams.get('sort') || 'popular';
  const selectedTechSlugs = useMemo(
    () => searchParams.get('techs')?.split(',').filter(Boolean) || [],
    [searchParams],
  );

  // 2. 검색어에 따른 기술 스택 필터링 로직 추가
  const { data: techStack = [] } = useTechStackData();

  {
  }
  // 3. slug를 기반으로 실제 name을 찾아서 배지에 표시하기 위한 매핑
  const selectedTechNames = useMemo(() => {
    return selectedTechSlugs.map((slug) => {
      const tech = techStack.find((t) => t.slug === slug);

      return tech ? tech.name : slug; // 데이터를 못 찾으면 slug라도 표시
    });
  }, [selectedTechSlugs, techStack]);

  const filteredTech = techStack.filter((tech) =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. URL 업데이트 공통 함수
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // 해당 키가 없을 때 필터를 적용하지 않도록
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'ALL' || value === '전체') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.set('page', '1'); // 필터 변경 시 1페이지로 이동
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 기술 스택 선택 (slug를 URL에 저장)
  const handleSelectTech = (slug: string) => {
    if (selectedTechSlugs.includes(slug)) return;
    if (selectedTechSlugs.length >= 3)
      return alert('최대 3개까지 선택 가능합니다.');

    const newTechs = [...selectedTechSlugs, slug];
    updateParams({ techs: newTechs.join(',') });
    setSearchTerm('');
    onClose();
  };

  // 기술 스택 삭제
  const handleRemoveTech = (slug: string) => {
    const newTechs = selectedTechSlugs.filter((s) => s !== slug);
    updateParams({ techs: newTechs.length > 0 ? newTechs.join(',') : null });
  };

  const sortOption = [
    { label: '추천순', value: 'popular' },
    { label: '최신순', value: 'latest' },
  ];
  return (
    <section className="container-col gap-8">
      {/* 카테고리 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000">카테고리</h5>

        <div className="c1 flex gap-3">
          {/* 전체 버튼 추가 */}
          {ALL_CATEGORIES.map((job) => (
            <Button
              key={job}
              onClick={() => updateParams({ category: job })}
              variant={'none'}
              className={cn(
                'h-8.5 transition-colors',
                currentCategory === job
                  ? 'bg-main-400 border-main-400 hover:bg-main-500400 text-white'
                  : 'border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-100/80 hover:text-gray-700',
              )}
            >
              {job}
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
            value={searchTerm} // state와 연결
            onClick={onOpen}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 4. 선택된 배지들 (URL 상태 기반) */}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTechSlugs.map((slug, index) => (
              <span
                key={slug}
                className="bg-main-400 flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white"
              >
                {selectedTechNames[index]}
                <button onClick={() => handleRemoveTech(slug)}>×</button>
              </span>
            ))}
          </div>

          {/* 5. 드롭다운 리스트 */}
          {isOpen && (
            <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {filteredTech.map((tech) => {
                  const isSelected = selectedTechSlugs.includes(tech.slug);

                  return (
                    <button
                      key={tech.id}
                      onClick={() => handleSelectTech(tech.slug)}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all',
                        isSelected
                          ? 'bg-main-50 text-main-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100',
                      )}
                    >
                      {tech.name}
                      {isSelected && <Check size={15} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* 정렬 섹션 */}
      <article className="flex flex-col gap-3">
        <h5 className="h6 text-gray-1000 mb-3">정렬</h5>
        <div className="flex w-full rounded-lg border border-gray-200 bg-gray-100 p-1">
          {sortOption.map((option) => (
            <button
              key={option.value}
              onClick={() => updateParams({ sort: option.value })}
              className={cn(
                'flex-1 cursor-pointer rounded-md py-2 text-sm font-bold transition-all',
                currentSort === option.value
                  ? 'text-main-600 text-gray-1000 bg-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700',
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
