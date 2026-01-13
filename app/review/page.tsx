'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import Line from '@/components/common/Line';
import { Input } from '@/components/ui/input/Input';

import { FolderOpen, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import FormSelect from '@/components/common/FormSelect';
import interviewReviews from '@/data/interviewReviews.json';

import {
  EMPLOYMENT_TYPE_OPTIONS,
  INTERVIEW_PERIOD_OPTIONS,
  INTERVIEW_TYPE_OPTIONS,
  JOB_CATEGORY_OPTIONS,
  PASS_STATUS_OPTIONS,
} from '@/constants/selectOptions';
import { base } from 'framer-motion/client';

const ReviewPage = () => {
  const router = useRouter();

  return (
    <div>
      <HeaderTitleBox
        title={'면접 후기'}
        content={'실제 면접 경험을 공유하고 다른사람들의 후기를 확인해 보세요 '}
        icon={FolderOpen}
        buttonOption={{
          text: '후기 등록',
          action: () => {
            router.push('/');
          },
        }}
      />

      <Line color="gray300" my={6} />

      <div className="flex gap-3">
        <Input placeholder="기업명" rightIcon={Search} />
        <FormSelect options={PASS_STATUS_OPTIONS} placeholder="합격여부" />
        <FormSelect options={INTERVIEW_PERIOD_OPTIONS} placeholder="면접시기" />
        <FormSelect options={JOB_CATEGORY_OPTIONS} placeholder="직무" />

        <FormSelect options={EMPLOYMENT_TYPE_OPTIONS} placeholder="고용유형" />

        <FormSelect options={INTERVIEW_TYPE_OPTIONS} placeholder="면접전형" />
      </div>

      {interviewReviews.map(
        ({
          basicInfo,
          evaluation,
          evidence,
          resultInfo,
          reviewContent,
          userId,
        }) => (
          <div key={userId}>
            <div className="flex gap-2">
              <p>{basicInfo.companyName}</p>
              <div className="flex gap-3">
                <p>{basicInfo.jobCategory}</p>
                <p>{basicInfo.interviewDate}</p>
                <p>{basicInfo.employmentType}</p>
              </div>
            </div>


            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <p className="text-main-400 font-bold">Q. </p>
                <p>React의 Virtual DOM에 대해 설명해주세요.</p>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ReviewPage;
