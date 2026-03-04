import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import {
  fetchReviewById,
  fetchReviewsData,
  ReviewFilterOptions,
} from '../services/fetchReviewData';

export const useFetchReviewsData = (filters: ReviewFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.review.list(filters),
    queryFn: () => fetchReviewsData(filters),
  });
};

export const useFetchReviewByIdData = (reviewId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.review.detail(reviewId),
    queryFn: () => fetchReviewById(reviewId),
  });
};
