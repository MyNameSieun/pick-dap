import { useQuery } from '@tanstack/react-query';
import { fetchInterviewQuestion } from '../services/fetchInterviewQuestion';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchInterviewQuestion = () => {
  return useQuery({
    queryFn: () => fetchInterviewQuestion(),
    queryKey: QUERY_KEYS.interview_question.list(),
  });
};
