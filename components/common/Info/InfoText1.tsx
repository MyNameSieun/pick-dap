'use client';

import { Bookmark, Dot, Heart, MessageSquare } from 'lucide-react';
import infoData from '@/data/infoData.json';
import Image from 'next/image';
import { displayDate } from '@/lib/displayDate';

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
      <div className="c1 flex h-fit w-fit gap-2 text-gray-600">
        <div className="flex items-center gap-1">
          <div className="relative h-5 w-5 rounded-full">
            <Image
              className="rounded-full border border-gray-200 object-cover"
              alt="작성자 프로필"
              src={`${image && (image || infoData.author.profileImage)}`}
              fill
              priority
            />
          </div>
          <p className="text-gray-600">
            {author && (author || infoData.author.username)}
          </p>
        </div>

        {createdAt && (
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span className="text-[10px]">
              <Dot height={14} className="text-gray-400" />
            </span>
            <span className="text-gray-600">{displayDate(createdAt)}</span>
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
