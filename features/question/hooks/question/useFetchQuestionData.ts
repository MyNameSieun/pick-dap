// features/question/hooks/question/useFetchQuestionData.ts
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  fetchQuestionByIdx,
  fetchQuestions,
  QuestionFilterOptions,
} from '../../services/question/fetchQuestion';

export const useFetchQuestionData = (filters: QuestionFilterOptions) => {
  // 전체 질문 조회
  return useQuery({
    // 필터 값이 바뀔 때마다 쿼리를 다시 실행
    queryKey: QUERY_KEYS.question.list(filters),
    queryFn: () => fetchQuestions(filters),
  });
};

// 특정 질문 조회
export const useFetchQuestionByIdx = (idx: number | string, userId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.question.byIdx(Number(idx)),
    queryFn: () => fetchQuestionByIdx(Number(idx), userId),

    staleTime: 1000 * 60 * 5,
  });
};
