'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { EllipsisVertical, Eye, Heart } from 'lucide-react';
import { toast } from 'sonner';

import BackButton from '@/components/common/BackButton';
import CommentEditor from '@/components/common/Comments/CommentEditor';
import InfoAuthor from '@/components/common/Info/InfoAuthor';
import { Button } from '@/components/ui/button/Button';
import Loader from '@/components/ui/Loader';
import CommunityManageButton from './CommunityManageButton';

import { useFetchPostDetail } from '../../hooks/useFetchPostsData';
import { useIncrementPostViewCount } from '../../hooks/useIncrementPostViewCount';
import { useTogglePostLike } from '../../hooks/useTogglePostLike';
import { useSession } from '@/store/session';
import { cn } from '@/lib/utils';
import { displayDate } from '@/lib/displayDate';

const CommunityDetail = ({
  categorySlug,
  slug,
  type,
}: {
  categorySlug: string;
  slug: string;
  type: 'mypage' | 'community';
}) => {
  const user = useSession()?.user;
  const [isManage, setManage] = useState(false);

  const { data: post, isPending: isPostPending } = useFetchPostDetail(
    categorySlug,
    slug,
    user?.id,
  );

  const { mutate: incrementView } = useIncrementPostViewCount();
  const { mutate: togglePostLikeMutation } = useTogglePostLike({
    onError: () => {
      toast.error('좋아요 요청에 실패했습니다', { position: 'top-center' });
    },
  });

  useEffect(() => {
    if (!post?.id) return;
    const viewed = JSON.parse(sessionStorage.getItem('viewed_post') || '[]');
    if (!viewed.includes(post.id)) {
      incrementView(post.id);
      sessionStorage.setItem(
        'viewed_post',
        JSON.stringify([...viewed, post.id]),
      );
    }
  }, [post?.id, incrementView]);

  if (isPostPending || !post) return <Loader />;

  const heartHandler = () => {
    togglePostLikeMutation({ postId: post.id, slug: slug });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4">
        <BackButton
          path={
            type === 'community'
              ? `/community/${categorySlug}`
              : '/mypage/community'
          }
          label={<span>뒤로가기</span>}
        />
      </div>

      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-8 p-8 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl leading-snug font-bold tracking-tight text-gray-900 md:text-3xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600">
                  <Eye size={16} />
                  <span>{post.view_count?.toLocaleString()}</span>
                </div>

                {post.user_id === user?.id && (
                  <div className="relative">
                    <Button
                      onClick={() => setManage(!isManage)}
                      size="icon"
                      variant="ghost"
                      className={cn(
                        'h-9 w-9 rounded-full transition-colors',
                        isManage ? 'bg-gray-100' : 'hover:bg-gray-100',
                      )}
                    >
                      <EllipsisVertical size={18} className="text-gray-600" />
                    </Button>

                    {isManage && (
                      <>
                        <div
                          className="fixed inset-0 z-40 cursor-default"
                          onClick={() => setManage(false)}
                        />

                        <div className="absolute top-full right-0 z-50 mt-2">
                          <CommunityManageButton
                            postId={post.id}
                            categorySlug={categorySlug}
                            postSlug={slug}
                            onClose={() => setManage(false)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-gray-50 pb-6">
              <InfoAuthor
                image={post?.profiles.avatar_url || '/profile.jpg'}
                author={post?.profiles.nickname || '익명'}
                createdAt={displayDate(post?.create_at) || ''}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div
              className="prose max-w-none text-[16px] leading-[1.8] text-gray-800"
              style={{ wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: post?.content || '' }}
            />

            {post?.image_urls?.[0] && (
              <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <Image
                  src={post.image_urls[0]}
                  alt="게시글 이미지"
                  width={800}
                  height={500}
                  className="h-auto w-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center border-t border-gray-50 pt-10">
            <Button
              onClick={heartHandler}
              variant="ghost"
              className={cn(
                'group flex h-12 items-center gap-2.5 rounded-full border border-gray-200 px-8 transition-all duration-300 active:scale-95',
                post.isLiked
                  ? 'border-red-100 bg-red-50 text-red-600'
                  : 'border-gray-200 hover:border-red-200 hover:bg-red-50/50',
              )}
            >
              <Heart
                size={20}
                className={cn(
                  'transition-all group-hover:scale-110',
                  post.isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 group-hover:text-red-400',
                )}
              />
              <span className="text-base font-bold">{post.like_count}</span>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/80 p-8 md:p-10">
          <div className="mb-6"></div>
          <CommentEditor postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
