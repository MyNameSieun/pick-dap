'use client';

import BackButton from '@/components/common/BackButton';
import CommentEditor from '@/components/common/Comments/CommentEditor';
import InfoAuthor from '@/components/common/Info/InfoAuthor';
import { Button } from '@/components/ui/button/Button';
import { EllipsisVertical, Heart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import CommunityManageButton from './CommunityManageButton';
import { useFetchPostDetail } from '../../hooks/useFetchPostsData';
import Loader from '@/components/ui/Loader';
import { useIncrementPostViewCount } from '../../hooks/useIncrementPostViewCount';
import { useSession } from '@/store/session';
import { useTogglePostLike } from '../../hooks/useTogglePostLike';
import { cn } from '@/lib/utils';

const CommunityDetail = ({
  categorySlug,
  slug,
}: {
  categorySlug: string;
  slug: string;
}) => {
  const user = useSession()?.user;

  const { data: post, isPending: isPostPending } = useFetchPostDetail(
    categorySlug,
    slug,
    user?.id,
  );
  const { mutate: incrementView } = useIncrementPostViewCount();
  const { mutate: togglePostLikeMutation, isPending: isTogglePostLikePending } =
    useTogglePostLike({
      onError: () => {
        toast.error('좋아요 요청에 실패했습니다', { position: 'top-center' });
      },
    });

  const [isManage, setManage] = useState(false);

  useEffect(() => {
    if (!post?.id) return;

    const viewed = JSON.parse(sessionStorage.getItem('viewed_post') || '[]');

    if (!viewed.includes(post.id)) {
      incrementView(post.id);
    }

    sessionStorage.setItem('viewed_post', JSON.stringify([...viewed, post.id]));
  }, [post?.id, incrementView]);

  if (isPostPending || !post) return <Loader />;

  const heartHandler = () => {
    if (isTogglePostLikePending) return;

    togglePostLikeMutation({ postId: post.id, slug: post.slug });
  };
  return (
    <>
      <BackButton label={<p className="font-bold">뒤로가기</p>} />
      <div className="flex w-full flex-col gap-6 rounded-[12px] border border-gray-300 p-8">
        <div className="flex items-center justify-between">
          <h2 className="h2 text-black">{post?.title || ''}</h2>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            {post?.view_count || 0}
            <Button
              onClick={heartHandler}
              variant="white"
              className={cn(
                'group/like flex h-10 gap-2 rounded-full border-gray-200 text-gray-900 transition-all active:scale-95',
                post.isLiked
                  ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
                  : 'hover:border-gray-300',
              )}
            >
              <Heart
                size={16}
                className={cn(
                  'transition-colors',
                  post.isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 group-hover/like:text-red-400',
                )}
              />

              {post.like_count}
            </Button>

            {post.user_id === user?.id && (
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
                    <CommunityManageButton
                      postId={post.id}
                      categorySlug={categorySlug}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <InfoAuthor
            image={post?.profiles.avatar_url || '/profile.jpg'}
            author={post?.profiles.nickname || ''}
            createdAt={post?.create_at || ''}
          />
        </div>
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

        {/* <InfoComment key={v.id} commentId={v.} postId={v.postId} /> */}
        <div className="mt-10">
          <CommentEditor postId={post.id} />
        </div>
      </div>
    </>
  );
};
export default CommunityDetail;
