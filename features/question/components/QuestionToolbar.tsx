'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { Plus, Search } from 'lucide-react';

import Filter from '@/components/common/Filter';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useDisclosure } from '@/hooks/useClickOutside';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';
import { useState } from 'react';
import { StatusEnums } from '@/types/entity';
import { useSession } from '@/store/session';

const FILTER_OPTIONS: { value: 'ALL' | StatusEnums; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'pending', label: '미답변' },
  { value: 'completed', label: '답변완료' },
];

const QuestionToolbar = () => {
  const user = useSession()?.user;

  const router = useRouter();
  const searchParams = useSearchParams();
  const { openCreate } = useQuestionEditModalAction();

  const handleOpenEditModal = () => {
    if (!user) {
      const currentPath = window.location.pathname;
      return router.push(`/login?returnTo=${encodeURIComponent(currentPath)}`);
    }

    openCreate();
  };

  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const {
    isOpen: isFilterOpen,
    onToggle: toggleFilter,
    onClose: closeFilter,
    containerRef,
  } = useDisclosure();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'ALL') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // 검색 버튼을 누르지 않고 필터(카테고리/상태)만 바꿀 때도
    // 현재 입력창에 있는 값을 URL에 동기화
    const currentSearch = searchValue.trim();
    if (currentSearch) {
      params.set('q', currentSearch);
    } else {
      params.delete('q');
    }

    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 쿼리 값 가져오기
  const currentType = searchParams.get('type') || 'pickdap';
  const currentStatus = searchParams.get('status') || 'ALL';

  // 3. 검색 실행 핸들러
  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  // 사용 예시
  // updateParams({ type: 'pickdap' });
  // updateParams({ status: value });
  // updateParams({ q: searchValue.trim() });

  return (
    <article className="mx-9">
      <section className="flex items-center justify-between">
        {/* 상단 카테고리 & 필터 영역 */}
        <div className="text-button-md relative flex h-12 gap-6 rounded-[12px] border border-gray-200 bg-gray-100 p-2 font-bold">
          <div
            className={clsx(
              'absolute top-2 left-1 h-[calc(100%-12px)] w-[calc(50%-12px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out',
              currentType === 'pickdap' ? 'translate-x-0' : 'translate-x-full',
            )}
          />
          <button
            type="button"
            className={clsx(
              'z-10 flex-1 cursor-pointer px-6.5 py-1.5 transition-colors',
              currentType === 'pickdap' ? 'text-blue-400' : 'text-gray-1000',
            )}
            onClick={() => updateParams({ type: 'pickdap' })}
          >
            픽답 추천 질문
          </button>
          <button
            type="button"
            className={clsx(
              'z-10 flex-1 cursor-pointer px-6.5 py-1.5 transition-colors',
              currentType === 'user' ? 'text-blue-400' : 'text-gray-1000',
            )}
            onClick={() => updateParams({ type: 'user' })}
          >
            유저 등록 질문
          </button>
        </div>

        <div className="text-button-sm relative flex items-center gap-2">
          <div ref={containerRef}>
            <Filter
              options={FILTER_OPTIONS}
              handleFilterClick={toggleFilter}
              handleFilterSelect={(value) => {
                updateParams({ status: value });
                closeFilter();
              }}
              isFilterOpen={isFilterOpen}
              filterType={currentStatus}
            />
          </div>
          <Button variant="none" className="h-9.5 px-6">
            질문 담기
          </Button>
          <Button
            variant="default"
            className="h-9.5"
            onClick={handleOpenEditModal}
          >
            <div className="mx-2 flex items-center gap-1">
              <Plus size={20} /> 질문 등록
            </div>
          </Button>
        </div>
      </section>

      <section className="relative mt-2 flex items-center">
        <Input
          className="c1 text-gray-1000 h-11 w-full rounded-[8px] border-gray-200 pr-24 focus:border-blue-400"
          type="text"
          autoFocus
          placeholder="검색어를 입력하세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
        <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
          <Button
            onClick={handleSearchSubmit}
            size="sm"
            className="gap-1 rounded-[6px] bg-blue-400 text-white hover:bg-blue-500"
          >
            <Search size={16} />
          </Button>
        </div>
      </section>
    </article>
  );
};

export default QuestionToolbar;
