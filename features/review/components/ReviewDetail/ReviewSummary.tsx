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
    <section className="my-16 flex flex-col gap-16">
      <DetailRow label="면접 전형" isEmpty={!processes?.length}>
        <div className="flex flex-wrap gap-2">
          {processes?.map((p) => (
            <span
              key={p.process.id}
              className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-[13px] font-bold text-blue-600"
            >
              {p.process.name}
            </span>
          ))}
        </div>
      </DetailRow>

      <DetailRow label="종합 후기" isEmpty={!overall_review}>
        <div className="rounded-2xl bg-gray-50 p-8">
          <p className="leading-[1.8] whitespace-pre-wrap text-gray-700">
            {overall_review}
          </p>
        </div>
      </DetailRow>

      <DetailRow label="면접 질문" isEmpty={!questions?.length}>
        <div className="flex flex-col gap-4">
          {questions?.map((q, index) => (
            <div
              key={q.id}
              className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-main-400 flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-black text-white">
                    Q{index + 1}
                  </span>
                  <span className="font-bold text-gray-900">면접 질문</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-main-400 h-9 gap-2 rounded-full border text-gray-400"
                >
                  <Bookmark size={16} />{' '}
                  <span className="text-xs font-bold">저장하기</span>
                </Button>
              </div>
              <p className="pl-1 text-[15px] leading-relaxed text-gray-800">
                {q.review_content}
              </p>
            </div>
          ))}
        </div>
      </DetailRow>

      <DetailRow label="면접 팁" isEmpty={!interview_tip}>
        <div className="relative ml-4 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/30 p-8">
          <div className="absolute -top-4 -right-4 text-blue-100/50">
            <Bookmark size={80} fill="currentColor" />
          </div>
          <p className="leading-[1.8] whitespace-pre-wrap text-blue-900/80">
            {interview_tip}
          </p>
        </div>
      </DetailRow>
    </section>
  );
};
export default ReviewSummary;
