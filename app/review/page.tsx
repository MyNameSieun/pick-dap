'use client';
import { Input } from '@/components/ui/input/Input';
import { Search } from 'lucide-react';
import { Metadata } from 'next';
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

const ReviewPage = () => {
  const { data: interviewProcess, isPending: isInterviewProcessPending } =
    useFetchInterviewProcessData();

  const { data: jobRoles, isPending: isJobRolePending } = useFetchJobRoleData();

  if (isInterviewProcessPending || isJobRolePending) return <Loader />;

  const INTERVIEW_PROCESS_OPTIONS = interviewProcess?.map((i) => ({
    label: i.name,
    value: i.name,
  }));

  const JOB_ROLE_OPTIONS = jobRoles?.map((j) => ({
    label: j.name,
    value: j.name,
  }));

  return (
    <div className="flex flex-col gap-10">
      <ReviewMainHeader />
      <div>
        <div className="flex gap-3">
          <Input placeholder="기업명" rightIcon={Search} />
          <FormSelect options={PASS_STATUS_OPTIONS} placeholder="합격여부" />
          <FormSelect options={SEASON_OPTIONS} placeholder="면접시기" />
          <FormSelect options={JOB_ROLE_OPTIONS ?? []} placeholder="직무" />
          <FormSelect
            options={EMPLOYMENT_TYPE_OPTIONS}
            placeholder="고용유형"
          />
          <FormSelect
            options={INTERVIEW_PROCESS_OPTIONS ?? []}
            placeholder="면접전형"
          />
        </div>

        <section className="mt-4 rounded-[12px] border border-gray-300 bg-white p-10 pb-0 shadow-sm">
          <ReviewList />
          <article className="mb-5">
            <PaginationCustom />
          </article>
        </section>
      </div>
    </div>
  );
};

export default ReviewPage;
