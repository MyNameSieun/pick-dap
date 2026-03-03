'use client';
import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';

import { EyeIcon, Heart, Minus, MoreVertical, Trash2 } from 'lucide-react';
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
    <section className="mt-8 mb-6">
      <article className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-gray-1000 text-2xl font-bold">{company_name}</h3>
          <Tags size="big">{final_status_type}</Tags>
        </div>

        <div className="relative flex items-center gap-2">
          <Button
            onClick={handleLikeClick}
            variant="none"
            className={cn(
              'group/like flex h-10 gap-2 rounded-full border-gray-200 text-gray-900 transition-all active:scale-95',
              isLiked
                ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
                : 'hover:border-gray-300',
            )}
          >
            <Heart
              size={16}
              className={cn(
                'transition-colors',
                isLiked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 group-hover/like:text-red-400',
              )}
            />
            {like_count}
          </Button>
          {user && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <MoreVertical
                size={20}
                className="cursor-pointer text-gray-500"
              />
            </button>
          )}

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute top-14 right-0 z-20 w-32 rounded-md border border-gray-100 bg-white shadow-lg">
                <div className="py-1">
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                    onClick={handleDeleteReview}
                  >
                    <Trash2 size={14} /> 삭제하기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
      <article className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <p>{job_role.name}</p>
          <Minus className="rotate-90 text-gray-400" size={16} />
          <p>{employment_type}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>
            {interview_season} {interview_year}
          </p>
          <p className="flex items-center gap-1">
            <EyeIcon size={15} />
            {view_count}
          </p>
        </div>
      </article>
      <div className="mt-5">
        <Line />
      </div>
    </section>
  );
};

export default ReviewHeader;
