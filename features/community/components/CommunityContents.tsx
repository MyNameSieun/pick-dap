'use client';

import PostCard from './PostCard/PostCard';
import Loader from '@/components/ui/Loader';
import { useFetchPostData } from '../hooks/useFetchPostsData';

const CommunityContents = ({ categorySlug }: { categorySlug: string }) => {
  const { data: posts, isPending } = useFetchPostData(categorySlug);

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="py-20 text-center text-gray-500">
          이 카테고리에는 아직 게시글이 없습니다.
        </div>
      )}
    </div>
  );
};
export default CommunityContents;
