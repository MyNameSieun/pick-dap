import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchInterviewProcessData } from '../services/fetchInterviewProcessData';

export const useFetchInterviewProcessData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.process.list,
    queryFn: fetchInterviewProcessData,
  });
};
