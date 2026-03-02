import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchReviewById, fetchReviewsData } from '../services/fetchReviewData';

export const useFetchReviewsData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.review.list(),
    queryFn: fetchReviewsData,
  });
};

export const useFetchReviewByIdData = (reviewId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.review.detail(reviewId),
    queryFn: () => fetchReviewById(reviewId),
  });
};
