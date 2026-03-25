import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchAiInterview,
  fetchMyAiInterviews,
} from '../services/fetchAiInterview';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchAiInterview = (interviewId: string) => {
  return useQuery({
    queryFn: () => fetchAiInterview(interviewId),
    queryKey: QUERY_KEYS.aiInterview.detail(interviewId),
  });
};

const PAGE_SIZE = 10;

export const useFetchInfiniteMyAiInterviews = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.aiInterview.myList(),

    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const interviews = await fetchMyAiInterviews({ from, to });

      return interviews;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
};
