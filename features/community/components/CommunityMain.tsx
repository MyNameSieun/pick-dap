'use client';

import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Input } from '@/components/ui/input/Input';
import {
  Activity,
  Search,
  SquarePen,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; // useEffect 추가
import { cn } from '@/lib/utils';
import usePostFilters from '../hooks/usePostFilters';
import { useDisclosure } from '@/hooks/useClickOutside'; // 공통 훅 사용 권장

const CommunityMain = () => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useDisclosure(); // 필터 드롭다운 상태 관리

  const SORT_OPTIONS = [
    { label: '최신순', value: 'latest' },
    { label: '좋아요순', value: 'likes' },
    { label: '조회순', value: 'views' },
  ];

  const { sort, updateParams, searchQuery } = usePostFilters();
  const [searchValue, setSearchValue] = useState(searchQuery || '');

  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderTitleBox
        icon={Activity}
        title={<h4 className="text-2xl font-bold text-gray-900">커뮤니티</h4>}
        buttonOption={{
          text: '글쓰기',
          icon: SquarePen,
          action: () => router.push('/community/post/new'),
        }}
        content={<p>면접 경험을 공유하고 다른 사람들의 후기를 확인해보세요.</p>}
      />
      <div className="flex w-full items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="검색어를 입력하세요"
            rightIcon={Search}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="h-11 rounded-[13px] border-gray-200 bg-white shadow-sm transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400/10"
          />
        </div>

        <div className="relative">
          <button
            onClick={onToggle}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all active:scale-95',
              isOpen || sort !== 'latest'
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            <SlidersHorizontal size={18} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={onClose} />

              <div className="animate-in fade-in zoom-in-95 absolute top-13 right-0 z-20 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl duration-150">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      updateParams({ sort: option.value });
                      onClose();
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition-colors',
                      sort === option.value
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    {option.label}
                    {sort === option.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityMain;
