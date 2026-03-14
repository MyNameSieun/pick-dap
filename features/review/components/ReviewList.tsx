'use client';

import Link from 'next/link';
import { ChevronRight, CalendarDays, Briefcase } from 'lucide-react';
import Tags from '@/components/common/Tags/Tags';
import Loader from '@/components/ui/Loader';
import { useFetchInterviewQuestion } from '../hooks/useFetchInterviewQuestion';
import { useFetchJobRoleData } from '../hooks/useFetchJobRoleData';
import { mapToReviewDetail } from '../services/fetchReviewData';

const ReviewList = ({ reviews }: { reviews?: mapToReviewDetail[] }) => {
  const { data: interviewQuesties, isPending: isInterviewQuestiesPending } =
    useFetchInterviewQuestion();
  const { data: jobRoles, isPending: isJobRoleDataPending } =
    useFetchJobRoleData();

  if (isInterviewQuestiesPending || isJobRoleDataPending) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 py-4">
      {reviews?.map((review) => {
        const relatedQuestions = interviewQuesties?.filter(
          (q) => q.review_id === review.id,
        );

        const relatedJobs = jobRoles?.find((j) => j.id === review.job_role_id);

        return (
          <Link key={review.id} href={`review/${review.id}`}>
            <section className="group relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 active:scale-[0.99]">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {review.company_name}
                  </h3>

                  <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} className="text-gray-600" />
                      {relatedJobs?.name || '직무 미지정'}
                    </span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} className="text-gray-600" />
                      {review.interview_year} {review.interview_season}
                    </span>
                    <span className="text-gray-200">|</span>
                    <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold text-gray-700 uppercase">
                      {review.employment_type}
                    </span>
                  </div>
                </div>

                <Tags size="big">{review.final_status_type}</Tags>
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-gray-100/70 p-4">
                {relatedQuestions && relatedQuestions.length > 0 ? (
                  relatedQuestions.slice(0, 2).map((q) => (
                    <div key={q.id} className="flex gap-2.5">
                      <span className="shrink-0 text-[14px] font-black text-blue-500">
                        Q.
                      </span>
                      <p className="line-clamp-1 text-[14px] leading-relaxed text-gray-700">
                        {q.review_content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-gray-400 italic">
                    등록된 면접 질문이 없습니다.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end border-t border-gray-50 pt-3">
                <div className="flex items-center gap-1 text-[13px] font-bold text-gray-600 transition-colors group-hover:text-blue-500">
                  후기 자세히보기
                  <ChevronRight size={16} />
                </div>
              </div>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default ReviewList;
