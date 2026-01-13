'use client';

import { communityData } from '@/data/communityData';
import PostCard from './PostCard/PostCard';

const CommunityContents = ({ categoryId }: { categoryId: string }) => {
  const displayData =
    categoryId === '1'
      ? communityData
      : communityData.filter((v) => v.categoryId === categoryId);
  return (
    <div className="flex flex-col gap-4">
      {displayData.map((v) => (
        <PostCard key={v.id} post={v} />
      ))}

      <p className="c2 text-center text-gray-700">카테고리 {categoryId}</p>
    </div>
  );
};
export default CommunityContents;
