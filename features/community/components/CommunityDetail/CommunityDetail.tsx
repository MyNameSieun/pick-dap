'use client';

import BackButton from '@/components/common/BackButton';
import CommentEditor from '@/components/common/Comments/CommentEditor';
import InfoComment from '@/components/common/Comments/InfoComment';
import InfoAuthor from '@/components/common/Info/InfoAuthor';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { commentData } from '@/data/communityData';
import { EllipsisVertical, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import CommunityManageButton from './CommunityManageButton';
import { useFetchPostDetail } from '../../hooks/useFetchPostsData';
import Loader from '@/components/ui/Loader';

const CommunityDetail = ({
  categorySlug,
  slug,
}: {
  categorySlug: string;
  slug: string;
}) => {
  const { data: post, isPending } = useFetchPostDetail(categorySlug, slug);
  const [isHeart, setHeart] = useState(false);
  const [isManage, setManage] = useState(false);

  if (isPending) return <Loader />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const heartHandler = () => {
    setHeart(!isHeart);
    toast[isHeart ? 'info' : 'success'](
      isHeart ? '좋아요를 해제했습니다.' : '좋아요를 눌렀습니다.',
      { position: 'top-center' },
    );
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
              {/* {post?.stats.likeCount || 0} */}
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
            image={post?.profiles.avatar_url || '/profile.jpg'}
            author={post?.profiles.nickname || ''}
            createdAt={post?.create_at || ''}
          />
        </div>
        <Line my={1} />
        <div className="flex flex-col gap-2">
          {/* 1. 태그가 포함된 문자열을 HTML로 렌더링 */}
          <div
            className="b1 prose max-w-none whitespace-pre-wrap text-black"
            dangerouslySetInnerHTML={{ __html: post?.content || '' }}
          />

          {post?.image_urls?.[0] && (
            <Image
              src={post.image_urls[0]}
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
