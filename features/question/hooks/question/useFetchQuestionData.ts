import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  fetchMyQuestions,
  fetchMySaveQuestions,
  fetchQuestionByIdx,
  fetchQuestions,
  fetchUserQuestions,
  QuestionFilterOptions,
} from '../../services/question/fetchQuestion';

// 전체 목록 조회
export const useFetchQuestionData = (filters: QuestionFilterOptions) => {
  return useQuery({
    // 필터 값이 바뀔 때마다 쿼리를 다시 실행
    queryKey: QUERY_KEYS.question.list(filters),
    queryFn: () => fetchQuestions(filters),
  });
};

// 단건 상세 조회
export const useFetchQuestionByIdxData = (idx: number | string) => {
  return useQuery({
    queryKey: QUERY_KEYS.question.detail(Number(idx)),
    queryFn: () => fetchQuestionByIdx(Number(idx)),
    staleTime: 1000 * 60 * 5,
    enabled: !!idx,
  });
};

// ** 내가 작성한 모든 질문
export const useFetchMyQuestionData = (filters: QuestionFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.question.myList(filters),
    queryFn: () => fetchMyQuestions(filters),
    staleTime: 1000 * 60 * 5,
  });
};

const PAGE_SIZE = 5;

export const useFetchInfiniteQuestionData = (
  filters?: QuestionFilterOptions,
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.question.mySaveList(filters),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const questions = await fetchMySaveQuestions({ filters, from, to });

      return questions;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
};

// 특정 유저가 작성한 질문 목록 조회 (타인 프로필용)
export const useFetchQuestionByUserIdData = (userId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.question.userList(userId || ''),
    queryFn: () => fetchUserQuestions(userId || ''),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId, // userId가 들어온 시점에만 쿼리 실행
  });
};
