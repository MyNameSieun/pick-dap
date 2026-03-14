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

// 상세 조회
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

// 내가 작성한 글 조회
export const useFetchMyPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.myList, filters],
    queryFn: () => fetchPostsData({ ...filters, userId }),
    enabled: !!userId,
  });
};
