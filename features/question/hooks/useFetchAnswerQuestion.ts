'use client';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  fetchAnswerForQuestion,
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

// 단일 조회 (내가 쓴 답변 찾기)
export const useFetchAnswerQuestionById = (
  questionId?: string,
  userId?: string,
) => {
  return useQuery({
    queryFn: () => fetchAnswerQuestionById(questionId!, userId!),
    queryKey: QUERY_KEYS.answer.byUserAndQuestion(questionId!, userId!),
    enabled: !!questionId && !!userId,
  });
};

// 해당 질문에 대한 댓글 조회
export const useFetchAnswerForQuestion = (
  questionId: string,
  myUserId?: string,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.answer.byQuestionId(questionId), myUserId],
    queryFn: () => fetchAnswerForQuestion(questionId, myUserId),
  });
};
