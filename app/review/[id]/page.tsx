import BackButton from '@/components/common/BackButton';
import interviewReviews from '@/data/interviewReviews.json';
import { InterviewReview } from '@/features/interview/types/review';
import ReviewSummary from '@/features/review/components/ReviewDetail/ReviewSummary';
import ReviewHeader from '@/features/review/components/ReviewDetail/ReviewHeader';
import ReviewSummaryBar from '@/features/review/components/ReviewDetail/ReviewSummaryBar';
import { Goal, SmileIcon, Users, Zap } from 'lucide-react';

interface ReveiwDetailPageProps {
  params: Promise<{ id: string }>;
}

const ReviewDetailPage = async ({ params }: ReveiwDetailPageProps) => {
  const { id } = await params;
  const review = interviewReviews.find(
    (item) => item.id === id,
  ) as InterviewReview;

  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;
  const { basicInfo, evaluation, resultInfo, reviewContent, stats } = review;

  const topSummaries = [
    { label: '난이도', value: evaluation.difficulty, Icon: Zap },
    { label: '면접 인원', value: evaluation.intervieweeCount, Icon: Users },
    {
      label: '면접 분위기',
      value: evaluation.atmosphere.score,
      Icon: SmileIcon,
      isRate: true,
    },
    { label: '결과 발표', value: resultInfo.resultWaitingPeriod, Icon: Goal },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 break-keep">
      <BackButton label="목록으로 돌아가기" />

      <ReviewHeader
        basicInfo={basicInfo}
        resultInfo={resultInfo}
        stats={stats}
      />
      <ReviewSummaryBar topSummaries={topSummaries} />

      <ReviewSummary evaluation={evaluation} reviewContent={reviewContent} />
    </div>
  );
};

export default ReviewDetailPage;
