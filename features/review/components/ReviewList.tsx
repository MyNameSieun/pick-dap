import Tags from '@/components/common/Tags/Tags';
import Link from 'next/link';
import { ChevronRight, Minus } from 'lucide-react';
import Line from '@/components/common/Line';
import Loader from '@/components/ui/Loader';
import { useFetchInterviewQuestion } from '../hooks/useFetchInterviewQuestion';
import { useFetchJobRoleData } from '../hooks/useFetchJobRoleData';
import { useFetchReviewsData } from '../hooks/useFetchReviewsDate';
const ReviewList = () => {
  const { data: reviews, isPending: isReviewPending } = useFetchReviewsData();
  const { data: interviewQuesties, isPending: isInterviewQuestiesPending } =
    useFetchInterviewQuestion();
  const { data: jobRoles, isPending: isJobRoleData } = useFetchJobRoleData();

  if (isReviewPending || isInterviewQuestiesPending || isJobRoleData)
    return <Loader />;

  return (
    <>
      {reviews?.map((review) => {
        const relatedQuestions = interviewQuesties?.filter(
          (q) => q.review_id === review.id,
        );

        const relatedJobs = jobRoles?.filter(
          (j) => j.id === review.job_role_id,
        );

        return (
          <Link key={review.id} href={`review/${review.id}`}>
            <article className="text-gray-1000 relative mb-5 flex items-center gap-5">
              <h3 className="h3">{review.company_name}</h3>

              <div className="b1 flex gap-1">
                <p>{relatedJobs?.map((j) => j.name)}</p>
                <Minus className="rotate-90 text-gray-300" />
                <p>
                  {review.interview_year} {review.interview_season}
                </p>
                <Minus className="rotate-90 text-gray-300" />
                <p>{review.employment_type}</p>
              </div>
              <Tags size="big" className="absolute right-0">
                {review.final_status_type}
              </Tags>
            </article>

            <article className="flex flex-col gap-1">
              {relatedQuestions?.map((q) => (
                <div key={q.id} className="b1 flex gap-1">
                  <p className="text-main-400 font-bold">Q. </p>
                  <p className="text-gray-1000"> {q.review_content} </p>
                </div>
              ))}
            </article>
            <p className="c1 flex items-center justify-end text-gray-700">
              후기 자세히보기
              <ChevronRight size={15} className="text-icon-default" />
            </p>

            <Line color="gray300" />
          </Link>
        );
      })}
    </>
  );
};

export default ReviewList;
