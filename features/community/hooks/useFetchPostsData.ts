import { useQuery } from '@tanstack/react-query';
import {
  fetchPostDetail,
  fetchPostsData,
  PostFilterOptions,
} from '../services/fetchPostsData';
import { QUERY_KEYS } from '@/lib/constants';

// 특정 카테고리 목록 조회

export const useFetchPostData = (filters: PostFilterOptions) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.list(filters),
    queryFn: () => fetchPostsData(filters),
  });
};
export const useFetchPostDetail = (
  categorySlug: string,
  postSlug: string,
  userId?: string,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.detail(postSlug, userId),
    queryFn: () => fetchPostDetail(categorySlug, postSlug, userId),
    enabled: !!categorySlug && !!postSlug,
  });
};
