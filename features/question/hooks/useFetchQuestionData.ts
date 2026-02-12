import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { fetchQuestion, fetchQuestionByIdx } from '../services/fetchQuestion';

export const useFetchQuestionData = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.list,
    queryFn: fetchQuestion,
  });
};

export const useFetchQuestionDataByIdx = (idx: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.byIdx(idx),
    queryFn: () => fetchQuestionByIdx(idx),

    staleTime: 1000 * 60 * 5,
  });
};
