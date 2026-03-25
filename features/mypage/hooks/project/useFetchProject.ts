import { QUERY_KEYS } from '@/lib/constants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchMyListProject,
  fetchProjectMyDetail,
} from '../../services/project/fetchProject';

const PAGE_SIZE = 10;
export const useFetchInfiniteProjectMyList = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.project.myList,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const myProjects = await fetchMyListProject({ from, to });
      return myProjects;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
};

export const useFetchProjectMyDetail = (slug: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.project.myDetail(slug),
    queryFn: () => fetchProjectMyDetail(slug),
  });
};
