import { useQuery } from '@tanstack/react-query';
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
    enabled: !!idx, // idx가 있을 때만 실행되도록
  });
};

// 내가 작성한 모든 질문 (마이페이지용, 보안 위해 props로 userId를 받지 않음)
export const useFetchMyQuestionData = (filters: QuestionFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.question.myList(filters),
    queryFn: () => fetchMyQuestions(filters),
    staleTime: 1000 * 60 * 5,
  });
};

// 내가 저장한 모든 질문 (마이페이지용)
export const useFetchMySaveQuestionData = (filters: QuestionFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.question.mySaveList(filters),
    queryFn: () => fetchMySaveQuestions(filters),
    staleTime: 1000 * 60 * 5,
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
