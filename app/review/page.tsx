import Line from '@/components/common/Line';
import { Input } from '@/components/ui/input/Input';
import { Search } from 'lucide-react';

import FormSelect from '@/components/common/FormSelect';

import {
  EMPLOYMENT_TYPE_OPTIONS,
  INTERVIEW_PERIOD_OPTIONS,
  INTERVIEW_TYPE_OPTIONS,
  JOB_CATEGORY_OPTIONS,
  PASS_STATUS_OPTIONS,
} from '@/constants/selectOptions';

import PaginationCustom from '@/components/common/PaginationCustom';
import ReviewList from '@/features/review/components/ReviewList';
import ReviewMainHeader from '@/features/review/components/ReviewMainHeader';

const ReviewPage = () => {
  return (
    <div>
      <ReviewMainHeader />
      <Line color="gray300" my={6} />
      <div className="flex gap-3">
        <Input placeholder="기업명" rightIcon={Search} />
        <FormSelect options={PASS_STATUS_OPTIONS} placeholder="합격여부" />
        <FormSelect options={INTERVIEW_PERIOD_OPTIONS} placeholder="면접시기" />
        <FormSelect options={JOB_CATEGORY_OPTIONS} placeholder="직무" />

        <FormSelect options={EMPLOYMENT_TYPE_OPTIONS} placeholder="고용유형" />

        <FormSelect options={INTERVIEW_TYPE_OPTIONS} placeholder="면접전형" />
      </div>

      <section className="mt-9 rounded-[12px] border border-gray-300 bg-white p-10 pb-0 shadow-sm">
        <ReviewList />
        <article className="mb-5">
          <PaginationCustom />
        </article>
      </section>
    </div>
  );
};

export default ReviewPage;
