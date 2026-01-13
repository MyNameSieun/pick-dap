import Tags from '@/components/common/Tags/Tags';
import Link from 'next/link';
import interviewReviews from '@/data/interviewReviews.json';
import { ChevronRight, Minus } from 'lucide-react';
import Line from '@/components/common/Line';
const ReviewList = () => {
  return (
    <>
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
    </>
  );
};

export default ReviewList;
