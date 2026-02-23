// features/question/hooks/comment/useFetchComment.ts

import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../services/comment/fetchComments';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchComment = (answerId: string) => {
  return useQuery({
    queryFn: () => fetchComments(answerId),
    queryKey: QUERY_KEYS.comment.byAnswerId(answerId),
    enabled: !!answerId, // answerId가 있을 때만 쿼리 실행
  });
};
