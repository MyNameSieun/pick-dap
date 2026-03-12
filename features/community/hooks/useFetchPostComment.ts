import { useQuery } from '@tanstack/react-query';
import { fetchPostComments } from '../services/fetchPostComment';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchPostComment = (postId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.comment.byPostId(postId),
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });
};
