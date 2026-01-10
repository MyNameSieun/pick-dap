'use client';

import { Bookmark, Eye, Heart, MessageSquare } from 'lucide-react';
import infoData from '@/data/infoData.json';

const InfoText2 = ({
  viewCount,
  bookmarkCount,
  commentCount,
  likeCount,
}: {
  viewCount: number;
  bookmarkCount: number;
  commentCount: number;
  likeCount: number;
}) => {
  return (
    <>
      <div className="text-icon-default c2 flex h-fit w-fit gap-2">
        <div className="flex items-center gap-0.5">
          <Eye size={12} />
          {viewCount ?? infoData.stats.viewCount}
        </div>
        <div className="flex items-center gap-0.5">
          <Bookmark size={12} />
          {bookmarkCount ?? infoData.stats.bookmarkCount}
        </div>
        <div className="flex items-center gap-0.5">
          <MessageSquare size={12} />
          {commentCount ?? infoData.stats.commentCount}
        </div>
        <div className="flex items-center gap-1">
          <Heart size={12} className="fill-point-heart text-point-heart" />
          {likeCount ?? infoData.stats.likeCount}
        </div>
      </div>
    </>
  );
};
export default InfoText2;
