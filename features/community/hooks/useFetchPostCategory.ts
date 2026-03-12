import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/fetchPostCategory';
import { QUERY_KEYS } from '@/lib/constants';

export const useFetchPostCategory = () => {
  return useQuery({
    queryFn: fetchCategories,
    queryKey: QUERY_KEYS.post.list,
    staleTime: 1000 * 60 * 60,
  });
};
