import { fetchTechStacks } from '@/services/fetchTechStacks';
import { useQuery } from '@tanstack/react-query';

export const useTechStackData = () => {
  return useQuery({
    queryKey: ['techStacks'],
    queryFn: fetchTechStacks,
    staleTime: 1000 * 60 * 60,
  });
};
