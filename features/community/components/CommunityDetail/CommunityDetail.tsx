'use client';

import BackButton from '@/components/common/BackButton';
import CommentEditor from '@/components/common/Comments/CommentEditor';
import InfoComment from '@/components/common/Comments/InfoComment';
import InfoAuthor from '@/components/common/Info/InfoAuthor';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { commentData, communityData } from '@/data/communityData';
import { EllipsisVertical, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import CommunityManageButton from './CommunityManageButton';

const CommunityDetail = ({
  categoryId,
  postId,
}: {
  categoryId: string;
  postId: string;
}) => {
  const post = communityData.find(
    (v) => v.id === postId && v.categoryId === categoryId,
  );
  const [isHeart, setHeart] = useState(false);
  const [isManage, setManage] = useState(false);

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
          <h2 className="h2 text-black">{post?.title || ''}</h2>
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
              {post?.stats.likeCount || 0}
            </Button>
            <div className="relative">
              <Button
                onClick={() => setManage(!isManage)}
                size="icon"
                variant="white"
                className="text-icon-default h-10.5 w-10.5 rounded-[12px]"
              >
                <EllipsisVertical />
              </Button>
              {isManage && (
                <div className="absolute top-12 right-0">
                  <CommunityManageButton />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <InfoAuthor
            image={post?.author.profileImage || '/profile.jpg'}
            author={post?.author.username || ''}
            createdAt={post?.createdAt || ''}
          />
        </div>
        <Line my={1} />
        <div className="flex flex-col gap-2">
          <p className="b1 whitespace-pre-wrap text-black">
            {post?.content || ''}
          </p>
          {post?.stats.postImage && (
            <Image
              src={post?.stats.postImage || '/example1.jpg'}
              alt="게시글 이미지"
              height={180}
              width={200}
            />
          )}
        </div>
        <Line my={1} />
        {commentData
          .filter((v) => v.postId === post?.id)
          .map((v) => (
            <InfoComment key={v.id} commentId={v.id} postId={v.postId} />
          ))}
        <div className="mt-2">
          <CommentEditor />
        </div>
      </div>
    </>
  );
};
export default CommunityDetail;
