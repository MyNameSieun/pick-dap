import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { fetchQuestion } from '../services/fetchQuestion';

export const useFetchQuestionData = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.list,
    queryFn: fetchQuestion,
  });
};
