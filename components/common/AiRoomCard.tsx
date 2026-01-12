'use client';

import Tags from '@/components/common/Tags/Tags';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import aiRoomsData from '@/data/aiRoomsData.json';

const AiRoomCard = () => {
  return (
    <>
      {aiRoomsData.map(
        ({ id, title, createdAt, questionCnt, tags, roomId }) => (
          <Link key={id} href={`/interview/rooms/${roomId}`}>
            <article className="card-col">
              <div className="flex flex-wrap">
                {tags.map(({ label }) => (
                  <Tags key={label} className="mr-1" color="green" size="big">
                    {label}
                  </Tags>
                ))}
              </div>

              <h6>{title}</h6>

              <div className="text-icon-default c2 flex items-center justify-between">
                <div className="flex gap-2">
                  <time className="">생성일: {createdAt}</time>
                  <Dot size={15} />
                  <p>질문 {questionCnt}개</p>
                </div>
              </div>
            </article>
          </Link>
        ),
      )}
    </>
  );
};

export default AiRoomCard;
