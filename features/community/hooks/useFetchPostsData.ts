import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchCommentedPosts,
  fetchLikedPosts,
  fetchPostDetail,
  fetchPostsData,
  fetchPostsInfiniteData,
  PostFilterOptions,
} from '../services/fetchPostsData';
import { QUERY_KEYS } from '@/lib/constants';

const PAGE_SIZE = 10;

// 특정 카테고리 목록 조회
export const useFetchInfinitePostData = (filters: PostFilterOptions) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.post.list(filters)],

    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      return await fetchPostsInfiniteData({ ...filters, from, to });
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length;
    },
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
export const useFetchInfiniteMyPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.post.myList, filters, userId],
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      return await fetchPostsInfiniteData({ ...filters, userId, from, to });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length;
    },
    enabled: !!userId,
  });
};

// 커뮤니티 메인 리스트용 페이지네이션 훅
export const useFetchPostDataByPage = (
  filters: PostFilterOptions,
  page: number,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.list(filters), page],
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      return fetchPostsData({ ...filters, from, to });
    },
    placeholderData: (previousData) => previousData,
  });
};

// 작성한 댓글 기준 게시글 조회
export const useFetchMyInfiniteCommentedPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.post.myList, 'commented', userId, filters],
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      return await fetchCommentedPosts(userId!, { ...filters, from, to });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length;
    },
    enabled: !!userId,
  });
};

// 좋아요 한 게시글 조회
export const useFetchInfiniteMyLikedPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.post.myList, 'liked', userId, filters],
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      return await fetchLikedPosts(userId!, { ...filters, from, to });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < PAGE_SIZE ? undefined : allPages.length;
    },
    enabled: !!userId,
  });
};
