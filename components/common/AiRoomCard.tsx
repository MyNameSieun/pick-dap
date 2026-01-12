'use client';

import Tags from '@/components/common/Tags/Tags';
import { Dot } from 'lucide-react';
import Link from 'next/link';

const AiRoomCard = () => {
  return (
    <Link href={'/question/3'}>
      <article className="card-col">
        <div className="flex flex-wrap">
          <Tags className="mr-1" color="green" size="big">
            답변 완료
          </Tags>
        </div>

        <h6>JVM의 구조와 Java의 실행방식을 설명해주세요.</h6>

        <div className="text-icon-default c2 flex items-center justify-between">
          <div className="flex gap-2">
            <time className="">생성일: 2026-01-04</time>
            <Dot size={15} />
            <p>질문 5개</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default AiRoomCard;
