'use client';
import { Input } from '@/components/ui/input/Input';
import { Search } from 'lucide-react';
import FormSelect from '@/components/common/SelectCustom';

import PaginationCustom from '@/components/common/PaginationCustom';
import ReviewList from '@/features/review/components/ReviewList';
import ReviewMainHeader from '@/features/review/components/ReviewMainHeader';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  PASS_STATUS_OPTIONS,
  SEASON_OPTIONS,
} from '@/constants/selectOptions';
import Loader from '@/components/ui/Loader';
import { useFetchInterviewProcessData } from '@/features/review/hooks/useFetchInterviewProcessData';
import { useFetchJobRoleData } from '@/features/review/hooks/useFetchJobRoleData';
import { useFetchReviewsData } from '@/features/review/hooks/useFetchReviewsDate';
import { useState } from 'react';
import { useReviewFilters } from '@/features/review/hooks/useReviewFilters';

const ReviewPage = () => {
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

  return (
    <div className="flex flex-col">
      <ReviewMainHeader />
      <div>
        <div className="flex gap-3">
          <Input
            placeholder="기업명"
            rightIcon={Search}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
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
            allLabel="직무"
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
            value={filters.interviewProcesses}
            onValueChange={(value) =>
              updateParams({ 'interview-process': value })
            }
          />
        </div>

        <section className="mt-4 rounded-[12px] border border-gray-300 bg-white p-10 pb-0 shadow-sm">
          <ReviewList reviews={reviews} />
          <article className="mb-5">
            <PaginationCustom />
          </article>
        </section>
      </div>
    </div>
  );
};

export default ReviewPage;
