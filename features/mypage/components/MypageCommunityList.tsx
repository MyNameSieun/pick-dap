import { useEffect } from 'react';
import {
  useFetchInfiniteMyLikedPosts,
  useFetchInfiniteMyPosts,
  useFetchMyInfiniteCommentedPosts,
} from '@/features/community/hooks/useFetchPostsData';
import CommunityCard from './CommunityCard';
import Loader from '@/components/ui/Loader';
import useMyPageCommunityFilters from '../hooks/useMyPageCommunityFilters';
import { useInView } from 'react-intersection-observer';

const MypageCommunityList = ({
  type,
  userId,
}: {
  type: 'posts' | 'comments' | 'liked';
  userId: string;
}) => {
  const { category, sort } = useMyPageCommunityFilters();
  const filters = {
    categorySlug: category,
    sort,
  };

  const postsQuery = useFetchInfiniteMyPosts(userId, filters);
  const commentsQuery = useFetchMyInfiniteCommentedPosts(userId, filters);
  const likedQuery = useFetchInfiniteMyLikedPosts(userId, filters);

  const queryResult =
    type === 'posts'
      ? postsQuery
      : type === 'comments'
        ? commentsQuery
        : likedQuery;

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    queryResult;

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <Loader />;

  const allPosts = data?.pages.flatMap((page) => page) || [];

  if (allPosts.length === 0)
    return <p className="py-20 text-center">내역이 없습니다.</p>;

  return (
    <div className="container-col gap-2.5">
      {allPosts.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}

      <div ref={ref} className="flex w-full items-center justify-center py-8">
        {isFetchingNextPage ? (
          <Loader />
        ) : (
          !hasNextPage && (
            <p className="text-sm text-gray-400">모든 기록을 불러왔습니다.</p>
          )
        )}
      </div>
    </div>
  );
};

export default MypageCommunityList;
