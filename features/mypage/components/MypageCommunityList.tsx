import {
  useFetchMyCommentedPosts,
  useFetchMyLikedPosts,
  useFetchMyPosts,
} from '@/features/community/hooks/useFetchPostsData';
import CommunityCard from './CommunityCard';
import PaginationCustom from '@/components/common/PaginationCustom';
import Loader from '@/components/ui/Loader';
import useMyPageCommunityFilters from '../hooks/useMyPageCommunityFilters';

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

  const postsQuery = useFetchMyPosts(userId, filters);
  const commentsQuery = useFetchMyCommentedPosts(userId, filters);
  const likedQuery = useFetchMyLikedPosts(userId, filters);

  const { data, isPending } =
    type === 'posts'
      ? postsQuery
      : type === 'comments'
        ? commentsQuery
        : likedQuery;

  if (isPending) return <Loader />;
  if (!data || data.length === 0)
    return <p className="py-20 text-center">내역이 없습니다.</p>;

  return (
    <div className="container-col gap-2.5">
      {data.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}
      <PaginationCustom />
    </div>
  );
};

export default MypageCommunityList;
