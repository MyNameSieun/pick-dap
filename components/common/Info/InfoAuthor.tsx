'use client';

import infoData from '@/data/infoData.json';
import Image from 'next/image';

const InfoAuthor = ({
  image,
  author,
  createdAt,
}: {
  image: string;
  author: string;
  createdAt: string;
}) => {
  return (
    <>
      <div className="flex h-fit w-fit items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            className="object-cover"
            alt="작성자 프로필"
            src={`${image ?? infoData.author.profileImage}`}
            fill
            priority
          />
        </div>
        <div className="flex h-12 flex-col justify-between">
          <p className="text-sm font-semibold text-black">
            {author ?? infoData.author.username}
          </p>
          <p className="c2 text-gray-700">{createdAt ?? infoData.createdAt}</p>
        </div>
      </div>
    </>
  );
};
export default InfoAuthor;
