import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import {
  fetchReviewById,
  fetchReviewsData,
  ReviewFilterOptions,
} from '../services/fetchReviewData';
import { useSession } from '@/store/session';

export const useFetchReviewsData = (filters: ReviewFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.review.list(filters),
    queryFn: () => fetchReviewsData(filters),
  });
};

export const useFetchReviewByIdData = (reviewId: string) => {
  const user = useSession()?.user;
  return useQuery({
    queryKey: QUERY_KEYS.review.detail(reviewId),
    queryFn: () => fetchReviewById(reviewId, user?.id ?? ''),
  });
};
