import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { fetchQuestion } from '../services/fetchQuestion';

export const useFeatchQuestionData = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: fetchQuestion,
  });
};
