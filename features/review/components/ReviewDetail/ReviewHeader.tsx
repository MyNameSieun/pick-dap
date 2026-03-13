'use client';
import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';

import {
  Briefcase,
  CalendarDays,
  EyeIcon,
  Heart,
  Minus,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { mapToReviewDetail } from '../../services/fetchReviewData';
import { useEffect, useState } from 'react';
import { useDeleteReview } from '../../hooks/useDeleteReview';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';
import { useSession } from '@/store/session';
import { useToggleReviewLike } from '../../hooks/useToggleReviewLike';
import { cn } from '@/lib/utils';
import { useIncrementReviewViewCount } from '../../hooks/useIncrementReviewViewCount';

const ReviewHeader = ({ review }: { review: mapToReviewDetail }) => {
  const {
    id: reviewId,
    company_name,
    final_status_type,
    interview_year,
    interview_season,
    employment_type,
    view_count,
    job_role,
    like_count,
    isLiked,
  } = review;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: incrementView } = useIncrementReviewViewCount();

  useEffect(() => {
    const viewed = JSON.parse(sessionStorage.getItem('viewed_review') || '[]');

    if (!viewed.includes(reviewId)) {
      incrementView(reviewId);
    }

    sessionStorage.setItem(
      'viewed_review',
      JSON.stringify([...viewed, reviewId]),
    );
  }, [reviewId, incrementView]);

  const user = useSession()?.user;

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteReview();

  const { mutate: isToggleLikeMutate, isPending: isToggleLikePending } =
    useToggleReviewLike();

  const router = useRouter();
  if (isDeletePending) return <Loader />;

  const handleDeleteReview = () => {
    const deleteConfirm = confirm('정말 삭제하시겠습니까?');
    if (!deleteConfirm) return;

    deleteMutate(review.id, {
      onSuccess: () => {
        alert('삭제 완료!');
        router.push('/review');
        router.refresh();
      },
      onError: () => {
        alert('삭제 중 오류가 발생했습니다.');
      },
    });
  };
  const handleLikeClick = () => {
    if (isToggleLikePending) return;
    isToggleLikeMutate({ reviewId });
  };

  return (
    <section className="mt-10 mb-8 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {company_name}
            </h1>
            <Tags size="big">{final_status_type}</Tags>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-gray-600" /> {job_role.name}
            </span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} className="text-gray-600" />{' '}
              {interview_season} {interview_year}
            </span>
            <span className="text-gray-200">|</span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-bold uppercase">
              {employment_type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleLikeClick}
            variant="ghost"
            className={cn(
              'group flex h-11 items-center gap-2 rounded-full border border-gray-200 px-5 transition-all active:scale-95',
              isLiked
                ? 'border-red-100 bg-red-50 text-red-600'
                : 'border-gray-200 hover:bg-gray-50',
            )}
          >
            <Heart
              size={18}
              className={cn(
                'transition-colors',
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-500 group-hover:text-red-400',
              )}
            />
            <span className="font-bold">{like_count}</span>
          </Button>

          {user && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full"
              >
                <MoreVertical size={20} className="text-gray-600" />
              </Button>
              {isMenuOpen && (
                <div className="absolute top-12 right-0 z-20 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                  <button
                    onClick={handleDeleteReview}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> 삭제하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-[13px] text-gray-600">
        <EyeIcon size={14} />
        <span>조회수 {view_count.toLocaleString()}</span>
      </div>
      <div className="h-px w-full bg-gray-200" />
    </section>
  );
};
export default ReviewHeader;
