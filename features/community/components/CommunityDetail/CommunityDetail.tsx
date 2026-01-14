'use client';

import BackButton from '@/components/common/BackButton';
import CommentEditor from '@/components/common/Comments/CommentEditor';
import InfoComment from '@/components/common/Comments/InfoComment';
import InfoAuthor from '@/components/common/Info/InfoAuthor';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { EllipsisVertical, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

const CommunityDetail = () => {
  const [isHeart, setHeart] = useState(false);
  const heartHandler = () => {
    setHeart(!isHeart);
    if (isHeart)
      toast.info('좋아요를 해제했습니다.', { position: 'top-center' });
    else {
      toast.success('좋아요를 눌렀습니다.', { position: 'top-center' });
    }
  };

  return (
    <>
      <BackButton label={<p className="font-bold">뒤로가기</p>} />
      <div className="flex w-full flex-col gap-6 rounded-[12px] border border-gray-300 p-8">
        <div className="flex items-center justify-between">
          <h2 className="h2 text-black">아니 님들 이게 맞음?!</h2>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Button
              variant="white"
              onClick={heartHandler}
              className="h-10.5 rounded-[12px] text-gray-800"
            >
              <Heart
                className={twMerge(
                  'text-point-heart',
                  isHeart ? 'fill-point-heart' : '',
                )}
              />
              123
            </Button>
            <Button
              size="icon"
              variant="white"
              className="text-icon-default h-10.5 w-10.5 rounded-[12px]"
            >
              <EllipsisVertical />
            </Button>
          </div>
        </div>
        <div className="flex">
          <InfoAuthor
            image="/profile.jpg"
            author="미야아옹"
            createdAt="2026.01.03"
          />
        </div>
        <Line my={1} />
        <div className="flex flex-col gap-2">
          <p className="b1 text-black">
            이 사람 누군지 알아보겠음? 난 모르겠는데 엌ㅋㅋ
          </p>
          <Image
            src="/pickbot.png"
            alt="게시글 이미지"
            height={180}
            width={200}
          />
        </div>
        <Line my={1} />
        <InfoComment
          profile="/profile.jpg"
          author="건재2"
          createdAt="2026.01.03"
          content="와 이건 생각 못했는데.. 감사합니다!"
        />
        <InfoComment
          profile="/profile.jpg"
          author="건재2"
          createdAt="2026.01.03"
          content="와 이건 생각 못했는데.. 감사합니다!"
        />
        <div className="mt-2">
          <CommentEditor />
        </div>
      </div>
    </>
  );
};
export default CommunityDetail;
