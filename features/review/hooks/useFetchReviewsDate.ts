import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchReviewsDate } from '../services/fetchReviewData';

const useFetchReviewsDate = () => {
  return useQuery({
    queryKey: QUERY_KEYS.review.list(),
    queryFn: fetchReviewsDate,
  });
};

export default useFetchReviewsDate;
