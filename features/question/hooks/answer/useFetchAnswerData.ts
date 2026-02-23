'use client';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAnswers,
  fetchMyAnswers,
  fetchMySingleAnswer,
  fetchUserAnswers,
} from '../../services/answer/fetchAnswer';

// 전체 목록 조회
export const useFetchAnswersData = (questionId: string) => {
  return useQuery({
    queryFn: () => fetchAnswers(questionId),
    queryKey: QUERY_KEYS.answer.byQuestionId(questionId),
    enabled: !!questionId,
  });
};

// 단일 조회 (나의 답변)
export const useFetchMyAnswerData = (questionId: string) => {
  return useQuery({
    queryFn: () => fetchMySingleAnswer(questionId),
    queryKey: QUERY_KEYS.answer.byQuestionIdMine(questionId),
    enabled: !!questionId,
  });
};

// 내가 작성한 모든 답변
export const useFetchMyAnswersListData = () => {
  return useQuery({
    queryFn: () => fetchMyAnswers(),
    queryKey: QUERY_KEYS.answer.myList(),
  });
};

// 특정 유저가 작성한 질문 목록 조회 (타인 프로필용)
export const useFetchAnswerUserIdData = (userId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.answer.byUserId(userId || ''),
    queryFn: () => fetchUserAnswers(userId || ''),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId, // userId가 들어온 시점에만 쿼리 실행
  });
};
