import { useQuery } from '@tanstack/react-query';
import { reviewQuestionTypeData } from '../services/fetchReviewQuestionTypeData';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchReviewQuestionTypeData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.reviewQuestionType.list(),
    queryFn: reviewQuestionTypeData,
  });
};
