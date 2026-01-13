'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import Line from '@/components/common/Line';
import { Input } from '@/components/ui/input/Input';

import {
  ArrowRightIcon,
  ChevronRight,
  FolderOpen,
  Minus,
  Search,
} from 'lucide-react';
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
import Tags from '@/components/common/Tags/Tags';
import Link from 'next/link';
import { Pagination } from '@/components/ui/Pagination';
import PaginationCustom from '@/components/common/PaginationCustom';

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

      <section className="mt-9 rounded-[12px] border border-gray-300 bg-white p-10 pb-0 shadow-sm">
        {interviewReviews.map(
          ({
            basicInfo,

            resultInfo,
            reviewContent,
            id,
          }) => (
            <Link key={id} href={`review/${id}`}>
              <article className="text-gray-1000 relative mb-5 flex items-center gap-5">
                <h3 className="h3">{basicInfo.companyName}</h3>

                <div className="flex gap-1">
                  <p>{basicInfo.jobCategory}</p>
                  <Minus className="rotate-90 text-gray-300" />
                  <p>{basicInfo.interviewDate}</p>
                  <Minus className="rotate-90 text-gray-300" />
                  <p>{basicInfo.employmentType}</p>
                </div>
                <Tags size="big" className="absolute right-0">
                  {resultInfo.finalStatus}
                </Tags>
              </article>

              <article className="flex flex-col gap-1">
                {reviewContent.specificQuestions.map((q) => (
                  <div key={q.id} className="b1 flex gap-1">
                    <p className="text-main-400 font-bold">Q. </p>
                    <p className="text-gray-1000"> {q.question} </p>
                  </div>
                ))}
              </article>
              <p className="c1 flex items-center justify-end text-gray-700">
                후기 자세히보기
                <ChevronRight size={15} className="text-icon-default" />
              </p>

              <Line color="gray300" />
            </Link>
          ),
        )}
        <article className="mb-5">
          <PaginationCustom />
        </article>
      </section>
    </div>
  );
};

export default ReviewPage;
