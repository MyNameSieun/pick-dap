'use client';

import { useState } from 'react';
import { Search, Check, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDisclosure } from '@/hooks/useClickOutside';
import { useStatusFilters } from '../hooks/useStatusFilters';

const QuestionSearchToolbar = () => {
  const { isOpen, onClose, onToggle, containerRef } = useDisclosure();

  const { updateParams, status, searchQuery, view } = useStatusFilters();
  const [searchValue, setSearchValue] = useState(searchQuery || '');

  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  const STATUS_OPTIONS = [
    { label: '전체', value: 'ALL' },
    { label: '답변 완료', value: 'completed' },
    { label: '답변 대기', value: 'pending' },
  ];

  return (
    <div ref={containerRef} className="relative mx-auto mb-8 w-full">
      <div className="flex gap-2">
        <div className="group relative flex flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
          </div>
          <input
            type="text"
            className="h-12 w-full rounded-[13px] border border-gray-200 bg-gray-50 pr-4 pl-12 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            placeholder="질문을 검색하세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
        </div>

        <button
          onClick={onToggle}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition-all active:scale-95',
            isOpen || status !== 'ALL'
              ? 'border-blue-500 bg-blue-50 text-blue-600'
              : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700',
          )}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>
      <div className="mt-10 mb-[-30px] flex gap-6 border-b border-gray-100">
        <button
          onClick={() => updateParams({ view: 'ALL' })}
          className={cn(
            'pb-3 text-sm transition-all duration-200',
            view === 'ALL'
              ? 'border-b-2 border-blue-500 font-bold text-blue-600'
              : 'font-medium text-gray-400 hover:text-gray-600',
          )}
        >
          전체 질문
        </button>
        <button
          onClick={() => updateParams({ view: 'my' })}
          className={cn(
            'pb-3 text-sm transition-all duration-200',
            view === 'my'
              ? 'border-b-2 border-blue-500 font-bold text-blue-600'
              : 'font-medium text-gray-400 hover:text-gray-600',
          )}
        >
          내가 쓴 질문
        </button>
      </div>
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute top-14 right-0 z-20 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl duration-150">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                updateParams({ status: option.value });
                onClose();
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition-colors',
                status === option.value
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              {option.label}
              {status === option.value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionSearchToolbar;
