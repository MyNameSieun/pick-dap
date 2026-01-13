'use client';

import { Bookmark, Heart, MessageSquare } from 'lucide-react';
import infoData from '@/data/infoData.json';
import Image from 'next/image';

const InfoText1 = ({
  image,
  author,
  createdAt,
  bookmarkCount,
  likeCount,
  commentCount,
}: {
  image: string;
  author: string;
  createdAt?: string;
  bookmarkCount?: number;
  likeCount?: number;
  commentCount?: number;
}) => {
  return (
    <>
      <div className="text-icon-default c1 flex h-fit w-fit gap-2">
        <div className="flex items-center gap-1">
          <div className="relative h-5 w-5 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              alt="작성자 프로필"
              src={`${image && (image || infoData.author.profileImage)}`}
              fill
              priority
            />
          </div>
          {author && (author || infoData.author.username)}
        </div>
        <div className="mx-2 flex items-center">
          <p className="text-gray-700">·</p>
        </div>
        {createdAt && (
          <div className="flex items-center gap-0.5">
            <p className="text-gray-700">{createdAt || infoData.createdAt}</p>
          </div>
        )}
        {bookmarkCount && (
          <div className="flex items-center gap-0.5">
            <Bookmark size={16} />
            {bookmarkCount || infoData.stats.bookmarkCount}
          </div>
        )}
        {likeCount && (
          <div className="flex items-center gap-1">
            <Heart size={16} className="fill-point-heart text-point-heart" />
            {likeCount || infoData.stats.likeCount}
          </div>
        )}
        {commentCount && (
          <div className="flex items-center gap-1">
            <MessageSquare size={16} />
            {commentCount || infoData.stats.commentCount}
          </div>
        )}
      </div>
    </>
  );
};
export default InfoText1;
