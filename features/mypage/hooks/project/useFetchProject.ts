import { QUERY_KEYS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import {
  fetchMyListProject,
  fetchProjectMyDetail,
} from '../../services/project/fetchProject';

export const useFetchProjectMyList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.project.myList,
    queryFn: fetchMyListProject,
  });
};

export const useFetchProjectMyDetail = (projectId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.project.myDetail(projectId),
    queryFn: () => fetchProjectMyDetail(projectId),
  });
};
