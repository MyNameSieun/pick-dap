import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../services/comment/fetchComments';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchComment = (answerId: string, currentUserId?: string) => {
  return useQuery({
    queryFn: () => fetchComments(answerId, currentUserId),
    queryKey: QUERY_KEYS.comment.byAnswerId(answerId),
  });
};
