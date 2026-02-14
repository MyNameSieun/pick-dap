import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  fetchQuestionByIdx,
  fetchQuestions,
} from '../../services/question/fetchQuestion';

export const useFetchQuestionData = () => {
  // 전체 질문 조회
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.list,
    queryFn: fetchQuestions,
  });
};

// 특정 질문 조회
export const useFetchQuestionByIdx = (idx: number | string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.byIdx(Number(idx)),
    queryFn: () => fetchQuestionByIdx(Number(idx)),

    staleTime: 1000 * 60 * 5,
  });
};
