import { QUERY_KEYS } from '@/lib/constants';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  fetchAnswerQuestion,
  fetchAnswerQuestionById,
} from '../services/fetchAnswerQuestion';

// 다중 댓글 조회
export const useFetchAnswerQuestion = () => {
  return useSuspenseQuery({
    queryFn: fetchAnswerQuestion,
    queryKey: QUERY_KEYS.answer.list,
  });
};

// 단일 댓글 조회
export const useFetchAnswerQuestionById = (
  questionId?: string,
  userId?: string,
) => {
  return useQuery({
    queryFn: () => fetchAnswerQuestionById(questionId!, userId!),
    queryKey: QUERY_KEYS.answer.byId(questionId!, userId!),
    enabled: !!questionId && !!userId,
  });
};
