import { Button } from '@/components/ui/button/Button';
import {
  InterviewEvaluation,
  ReviewContent,
} from '@/features/interview/types/review';
import { Bookmark } from 'lucide-react';
import DetailRow from './DetailRow';

interface ReviewSummaryProps {
  evaluation: InterviewEvaluation;
  reviewContent: ReviewContent;
}

const ReviewSummary = ({ evaluation, reviewContent }: ReviewSummaryProps) => {
  return (
    <section className="my-12 flex flex-col gap-15">
      {/* 면접 전형 */}
      <DetailRow
        label="면접 전형"
        isEmpty={
          !evaluation.interviewSteps || evaluation.interviewSteps.length === 0
        }
      >
        <div className="flex items-center gap-3">
          {evaluation.interviewSteps?.map((v) => (
            <p
              key={v}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {v}
            </p>
          ))}
        </div>
      </DetailRow>

      {/* 질문 유형 */}
      <DetailRow
        label="질문 유형"
        isEmpty={
          !reviewContent.questionTypes ||
          reviewContent.questionTypes.length === 0
        }
      >
        <div className="flex items-center gap-3">
          {reviewContent.questionTypes?.map((v) => (
            <p
              key={v}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {v}
            </p>
          ))}
        </div>
      </DetailRow>

      {/* 종합 후기 */}
      <DetailRow label="종합 후기" isEmpty={!reviewContent.overallReview}>
        <p className="break-keep">{reviewContent.overallReview}</p>
      </DetailRow>

      {/* 면접 질문 */}
      <DetailRow
        label="면접 질문"
        isEmpty={
          !reviewContent.specificQuestions ||
          reviewContent.specificQuestions.length === 0
        }
      >
        <div className="flex flex-col gap-3">
          {reviewContent.specificQuestions.map((q, index) => (
            <div
              key={q.id}
              className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-blue-500 font-bold text-white">
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <span className="text-gray-1000 font-bold">질문</span>
                </div>
                <Button className="h-10" variant="white">
                  저장 <Bookmark className="ml-1 size-4" />
                </Button>
              </div>
              <p className="text-gray-900">{q.question}</p>
            </div>
          ))}
        </div>
      </DetailRow>

      {/* 면접 팁 */}
      <DetailRow label="면접 팁" isEmpty={!reviewContent.interviewTip}>
        <p className="break-keep">{reviewContent.interviewTip}</p>
      </DetailRow>
    </section>
  );
};

export default ReviewSummary;
