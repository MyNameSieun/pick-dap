'use client';

import BackButton from '@/components/common/BackButton';
import ReviewSummary from '@/features/review/components/ReviewDetail/ReviewSummary';
import ReviewHeader from '@/features/review/components/ReviewDetail/ReviewHeader';
import ReviewSummaryBar from '@/features/review/components/ReviewDetail/ReviewSummaryBar';
import { Goal, SmileIcon, Users, Zap } from 'lucide-react';
import { useFetchReviewByIdData } from '@/features/review/hooks/useFetchReviewsDate';
import { use } from 'react';
import Loader from '@/components/ui/Loader';

interface ReveiwDetailPageProps {
  params: Promise<{ id: string }>;
}

const ReviewDetailPage = ({ params }: ReveiwDetailPageProps) => {
  const { id } = use(params);

  const { data: review, isPending: isReviewPending } =
    useFetchReviewByIdData(id);

  if (isReviewPending) return <Loader />;
  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  const topSummaries = [
    { label: '난이도', value: review.difficulty, Icon: Zap },
    { label: '면접 인원', value: review.interview_personnel_type, Icon: Users },
    {
      label: '면접 분위기',
      value: review.atmosphere_score,
      Icon: SmileIcon,
      isRate: true,
    },
    { label: '결과 발표', value: review.result_wait_time_type, Icon: Goal },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 break-keep">
      <BackButton label="목록으로 돌아가기" />

      <ReviewHeader review={review} />
      <ReviewSummaryBar topSummaries={topSummaries} />

      <ReviewSummary review={review} />
    </div>
  );
};

export default ReviewDetailPage;
