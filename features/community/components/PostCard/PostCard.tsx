'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, MessageSquare, Heart } from 'lucide-react';
import InfoText1 from '@/components/common/Info/InfoText1';
import Tags from '@/components/common/Tags/Tags';
import Loader from '@/components/ui/Loader';
import { useFetchPostCategory } from '../../hooks/useFetchPostCategory';
import { RawPostJoined } from '../../services/fetchPostsData';

const PostCard = ({ post }: { post: RawPostJoined }) => {
  const categorySlug = post.post_category?.slug;
  const { data: postCategory, isPending } = useFetchPostCategory();

  if (isPending) return <Loader />;

  const category = postCategory?.find((p) => p.id === post.category_id);
  const postSlug = post.slug;

  return (
    <Link href={`/community/${categorySlug}/${postSlug}`}>
      <div className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300">
        <div className="flex flex-1 flex-col items-start gap-3 overflow-hidden pr-4">
          <div className="flex items-center gap-2">
            <Tags size="small" category={true}>
              {category?.name || '기타'}
            </Tags>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <h6 className="truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {post.title || '제목 없음'}
            </h6>
            <p className="line-clamp-1 text-[14px] text-gray-500">
              {post.content?.replace(/<[^>]*>?/gm, '') || '내용이 없습니다.'}
            </p>
          </div>

          <div className="mt-1 flex w-full items-center justify-between">
            <InfoText1
              image={post.profiles?.avatar_url || '/profile.jpg'}
              author={post.profiles?.nickname || '익명'}
              createdAt={post.create_at}
            />

            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex items-center gap-1 text-[12px] font-medium">
                <Heart
                  size={14}
                  className={
                    post.likes.length > 0 ? 'fill-red-400 text-red-400' : ''
                  }
                />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-medium">
                <MessageSquare size={14} />
                <span>{post.comment_count}</span>
              </div>
            </div>
          </div>
        </div>

        {post.image_urls && post.image_urls[0] && (
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-100 md:h-28 md:w-28">
            <Image
              src={post.image_urls[0]}
              alt="썸네일"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostCard;
