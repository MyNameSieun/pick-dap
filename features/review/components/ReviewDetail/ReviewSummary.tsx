import { Bookmark } from 'lucide-react';
import DetailRow from './DetailRow';
import { Button } from '@/components/ui/button/Button';
import { RawReviewJoined } from '../../services/fetchReviewData';

const ReviewSummary = ({ review }: { review: RawReviewJoined }) => {
  const {
    interview_tip,
    overall_review,
    interview_question: questions,
    processes,
    review_questions: questionTypes,
  } = review;

  return (
    <section className="my-12 flex flex-col gap-15">
      {/* 면접 전형 */}
      <DetailRow
        label="면접 전형"
        isEmpty={!processes || processes.length === 0}
      >
        <div className="flex items-center gap-3">
          {processes?.map((p) => (
            <p
              key={p.process.id}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {p.process.name}
            </p>
          ))}
        </div>
      </DetailRow>

      {/* 질문 유형 */}
      <DetailRow
        label="질문 유형"
        isEmpty={!questionTypes || questionTypes.length === 0}
      >
        <div className="flex items-center gap-3">
          {questionTypes?.map((r) => (
            <p
              key={r.question_type.id}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {r.question_type.name}{' '}
            </p>
          ))}
        </div>
      </DetailRow>

      {/* 종합 후기 */}
      <DetailRow label="종합 후기" isEmpty={!overall_review}>
        <p className="break-keep whitespace-pre-wrap text-gray-900">
          {overall_review}
        </p>
      </DetailRow>

      {/* 면접 질문 */}
      <DetailRow
        label="면접 질문"
        isEmpty={!questions || questions.length === 0}
      >
        <div className="flex flex-col gap-3">
          {questions?.map((q, index) => (
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
              <p className="text-gray-900">{q.review_content}</p>
            </div>
          ))}
        </div>
      </DetailRow>

      {/* 면접 팁 */}
      <DetailRow label="면접 팁" isEmpty={!interview_tip}>
        <p className="break-keep whitespace-pre-wrap text-gray-900">
          {interview_tip}
        </p>
      </DetailRow>
    </section>
  );
};

export default ReviewSummary;
