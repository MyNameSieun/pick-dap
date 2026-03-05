'use client';
import { Input } from '@/components/ui/input/Input';
import { Search } from 'lucide-react';
import FormSelect from '@/components/common/SelectCustom';

// export const metadata: Metadata = {
//   title: '면접 후기',
//   description: '면접 후기를 검색하고 공유할 수 있습니다.',
// };

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
import {
  EmploymentType,
  FinalStatusType,
  InterviewSeasonType,
} from '@/types/entity';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFetchReviewsData } from '@/features/review/hooks/useFetchReviewsDate';

const ReviewPage = () => {
  const { data: interviewProcess, isPending: isInterviewProcessPending } =
    useFetchInterviewProcessData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: jobRoles, isPending: isJobRolePending } = useFetchJobRoleData();
  const dateParam = searchParams.get('date') || 'ALL';
  const [year, season] = dateParam.split(' ');

  const filters = {
    finalStatusType:
      (searchParams.get('final-status') as FinalStatusType) || 'ALL',
    // 쪼개진 값을 각각 할당
    interviewYear: (year === 'ALL' ? 'ALL' : Number(year)) as number | 'ALL',
    interviewSeason: (season === 'ALL' ? 'ALL' : season) as InterviewSeasonType,

    jobRole: (searchParams.get('job-role') as string) || 'ALL',
    employmentType: (searchParams.get('employment') as EmploymentType) || 'ALL',
    interviewProcesses:
      searchParams.get('interview-process' as string) || 'ALL',
    searchQuery: searchParams.get('q') || undefined,
  };
  const { data: reviews, isPending: isReviewPending } =
    useFetchReviewsData(filters);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'ALL') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
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
          <Input placeholder="기업명" rightIcon={Search} />
          <FormSelect
            options={PASS_STATUS_OPTIONS}
            allLabel="합격 여부"
            value={filters.finalStatusType}
            onValueChange={(value) => handleFilterChange('final-status', value)}
          />
          <FormSelect
            options={SEASON_OPTIONS}
            allLabel="면접 시기"
            value={dateParam}
            onValueChange={(val) => handleFilterChange('date', val)}
          />
          <FormSelect
            options={JOB_ROLE_OPTIONS ?? []}
            allLabel="직무"
            value={filters.jobRole}
            onValueChange={(value) => handleFilterChange('job-role', value)}
          />
          <FormSelect
            options={EMPLOYMENT_TYPE_OPTIONS}
            allLabel="고용유형"
            value={filters.employmentType}
            onValueChange={(value) => handleFilterChange('employment', value)}
          />
          <FormSelect
            options={INTERVIEW_PROCESS_OPTIONS ?? []}
            allLabel="면접전형"
            value={filters.interviewProcesses}
            onValueChange={(value) =>
              handleFilterChange('interview-process', value)
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
