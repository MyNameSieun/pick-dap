import { useQuery } from '@tanstack/react-query';
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

export const useFetchMyAiInterviews = () => {
  return useQuery({
    queryFn: fetchMyAiInterviews,
    queryKey: QUERY_KEYS.aiInterview.myList(),
  });
};
