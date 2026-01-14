'use client';

import Image from 'next/image';

const InfoComment = ({
  profile,
  author,
  createdAt,
  content,
}: {
  profile: string;
  author: string;
  createdAt: string;
  content: string;
}) => {
  return (
    <div className="flex h-fit w-full items-start gap-4">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-400">
        <Image
          className="object-cover"
          alt="댓글 작성자 프로필"
          src={profile ?? profile}
          height={32}
          width={32}
          priority
        />
      </div>
      <div className="flex h-fit flex-col gap-2">
        <div className="flex gap-1.5">
          <p className="c1 font-bold text-black">{author ?? author}</p>
          <p className="c1 text-gray-700">{createdAt ?? createdAt}</p>
        </div>
        <p className="c1 whitespace-pre-wrap text-black">
          {content ?? content}
        </p>
      </div>
    </div>
  );
};
export default InfoComment;
