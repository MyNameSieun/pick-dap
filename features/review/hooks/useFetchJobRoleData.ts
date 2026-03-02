import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { fetchJobRole } from '../services/fetchJobRoleData';

export const useFetchJobRoleData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.jobRole.list(),
    queryFn: fetchJobRole,
  });
};
