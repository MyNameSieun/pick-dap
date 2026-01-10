'use client';

import { Bookmark, Heart, MessageSquare } from 'lucide-react';
import infoData from '@/data/infoData.json';
import Image from 'next/image';

const InfoText1 = ({
  image,
  author,
  bookmarkCount,
  likeCount,
  viewCount,
}: {
  image: string;
  author: string;
  bookmarkCount: number;
  likeCount: number;
  viewCount: number;
}) => {
  return (
    <>
      <div className="text-icon-default c1 flex h-fit w-fit gap-3">
        <div className="flex items-center gap-1">
          <div className="relative h-5 w-5 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              alt="작성자 프로필"
              src={`${image ?? infoData.author.profileImage}`}
              fill
              priority
            />
          </div>
          {author ?? infoData.author.username}
        </div>
        <div className="flex items-center gap-0.5">
          <Bookmark size={16} />
          {bookmarkCount ?? infoData.stats.bookmarkCount}
        </div>
        <div className="flex items-center gap-1">
          <Heart size={16} className="fill-point-heart text-point-heart" />
          {likeCount ?? infoData.stats.likeCount}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={16} />
          {viewCount ?? infoData.stats.viewCount}
        </div>
      </div>
    </>
  );
};
export default InfoText1;
