'use client';

import { useState } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input/Input';
import FormSelect from '@/components/common/SelectCustom';
import PaginationCustom from '@/components/common/PaginationCustom';
import ReviewList from '@/features/review/components/ReviewList';
import Loader from '@/components/ui/Loader';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  PASS_STATUS_OPTIONS,
  SEASON_OPTIONS,
} from '@/constants/selectOptions';
import { useFetchInterviewProcessData } from '@/features/review/hooks/useFetchInterviewProcessData';
import { useFetchJobRoleData } from '@/features/review/hooks/useFetchJobRoleData';
import { useFetchReviewsData } from '@/features/review/hooks/useFetchReviewsDate';
import { useReviewFilters } from '@/features/review/hooks/useReviewFilters';

const ReviewMain = () => {
  const { data: interviewProcess, isPending: isInterviewProcessPending } =
    useFetchInterviewProcessData();

  const { data: jobRoles, isPending: isJobRolePending } = useFetchJobRoleData();

  const { updateParams, dateParam, ...filters } = useReviewFilters();
  const { data: reviews, isPending: isReviewPending } =
    useFetchReviewsData(filters);

  const [searchValue, setSearchValue] = useState(filters.searchQuery || '');

  const handleSearchSubmit = () => {
    updateParams({ q: searchValue.trim() });
  };

  if (isInterviewProcessPending || isJobRolePending || isReviewPending)
    return <Loader />;

  const INTERVIEW_PROCESS_OPTIONS = interviewProcess?.map((i) => ({
    label: i.name,
    value: i.name,
  }));

  const JOB_ROLE_OPTIONS = jobRoles?.map((j) => ({
    label: j.name,
    value: j.name,
  }));

  const handleReset = () => {
    updateParams({
      'final-status': 'ALL',
      date: 'ALL',
      'job-role': 'ALL',
      employment: 'ALL',
      process: 'ALL',
      q: null,
    });
    setSearchValue('');
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-900" />
          <h2 className="text-sm font-bold text-gray-900">상세 필터</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="lg:col-span-2 xl:col-span-1">
            <Input
              placeholder="기업명 검색"
              rightIcon={Search}
              value={searchValue}
              className="h-10 border-gray-200 bg-white"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </div>

          <FormSelect
            options={PASS_STATUS_OPTIONS}
            allLabel="합격 여부"
            value={filters.finalStatusType}
            onValueChange={(val) => updateParams({ 'final-status': val })}
          />
          <FormSelect
            options={SEASON_OPTIONS}
            allLabel="면접 시기"
            value={dateParam}
            onValueChange={(val) => updateParams({ date: val })}
          />
          <FormSelect
            options={JOB_ROLE_OPTIONS ?? []}
            allLabel="직무 전체"
            value={filters.jobRole}
            onValueChange={(val) => updateParams({ 'job-role': val })}
          />
          <FormSelect
            options={EMPLOYMENT_TYPE_OPTIONS}
            allLabel="고용유형"
            value={filters.employmentType}
            onValueChange={(value) => updateParams({ employment: value })}
          />
          <FormSelect
            options={INTERVIEW_PROCESS_OPTIONS ?? []}
            allLabel="면접전형"
            value={filters.processes}
            onValueChange={(value) => updateParams({ process: value })}
          />
        </div>

        <div className="mt-2 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-600"
          >
            <RotateCcw size={14} />
            필터 초기화
          </button>
        </div>
      </div>

      <section className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            총{' '}
            <span className="font-bold text-blue-600">
              {reviews?.length || 0}
            </span>
            개의 후기가 있습니다.
          </p>
        </div>

        <ReviewList reviews={reviews} />

        <div className="flex justify-center py-10">
          <PaginationCustom />
        </div>
      </section>
    </div>
  );
};

export default ReviewMain;
