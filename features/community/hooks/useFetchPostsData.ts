import { useQuery } from '@tanstack/react-query';
import {
  fetchCommentedPosts,
  fetchLikedPosts,
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
// 작성한 댓글 기준 게시글 조회 훅
export const useFetchMyCommentedPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.myList, 'commented', userId, filters],
    queryFn: () => fetchCommentedPosts(userId!, filters),
    enabled: !!userId,
  });
};

// 좋아요 한 게시글 조회 훅
export const useFetchMyLikedPosts = (
  userId: string | undefined,
  filters?: PostFilterOptions,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.myList, 'liked', userId, filters],
    queryFn: () => fetchLikedPosts(userId!, filters),
    enabled: !!userId,
  });
};
