import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { fetchQuestion, fetchQuestionById } from '../services/fetchQuestion';

export const useFetchQuestionData = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.list,
    queryFn: fetchQuestion,
  });
};

export const useFetchQuestionDataById = (id: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.byId(id),
    queryFn: () => fetchQuestionById(id), 
  });
};
