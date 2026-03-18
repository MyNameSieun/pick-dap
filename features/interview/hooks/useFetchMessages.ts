import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../services/fetchMessages';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchMessages = (interviewId: string) => {
  return useQuery({
    queryFn: () => fetchMessages(interviewId),
    queryKey: QUERY_KEYS.aiMessage.list(interviewId),
  });
};
