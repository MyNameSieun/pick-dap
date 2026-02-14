'use client';
import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAnswers,
  fetchMyAnswerData,
} from '../../services/answer/fetchAnswer';

// 특정 질문에 대한 모든 답변 조회
export const useFetchAnswersData = (questionId: string) => {
  return useQuery({
    queryFn: () => fetchAnswers(questionId),
    queryKey: QUERY_KEYS.answer.byQuestionId(questionId),
  });
};

// 단일 조회 (나의 답변)
export const useFetchMyAnswerData = (questionId?: string, userId?: string) => {
  return useQuery({
    queryFn: () => fetchMyAnswerData(questionId!, userId!),
    queryKey: QUERY_KEYS.answer.byUserAndQuestion(questionId!, userId!),
    enabled: !!questionId && !!userId,
  });
};
