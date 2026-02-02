'use client';

import Tags from '@/components/common/Tags/Tags';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Line from '@/components/common/Line';
import defaultProfile from '@/public/defaultProfile.png';

const CommunityCard = () => {
  return (
    <Link href={'/question/3'}>
      <article className="card-col-no-border">
        <div className="flex flex-wrap">
          <Tags className="mr-1" color="blue" size="big">
            스터디 모집
          </Tags>
        </div>

        <h6 className="h6">JVM의 구조와 Java의 실행방식을 설명해주세요.</h6>

        <div className="text-icon-default c2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image
                onDragStart={(e) => e.preventDefault()}
                className="object-cover"
                alt="작성자 프로필"
                src={defaultProfile}
                priority
                fill
              />
            </div>

            <div className="flex items-center gap-1">
              <Heart size={15} />
              <p className="c1">32</p>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={15} />
              <p className="c1">2</p>
            </div>
          </div>
        </div>
      </article>
      <Line />
    </Link>
  );
};

export default CommunityCard;
