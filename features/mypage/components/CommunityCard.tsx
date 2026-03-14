'use client';

import Tags from '@/components/common/Tags/Tags';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchMyPosts } from '@/features/community/hooks/useFetchPostsData';
import { useSession } from '@/store/session';
import Loader from '@/components/ui/Loader';
import { displayDate } from '@/lib/displayDate';

const CommunityCard = () => {
  const user = useSession()?.user;

  const { data: myPosts, isPending: isMyPostsPending } = useFetchMyPosts(
    user?.id,
  );

  if (isMyPostsPending) return <Loader />;
  return (
    <>
      {myPosts?.map((post) => (
        <div key={post.id}>
          <Link
            href={`/community/${post.post_category.slug}/${post.slug}`}
            className="group block border-b border-gray-200 px-3 py-5 transition-all hover:bg-gray-100/50"
          >
            <article className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Tags
                  color="blue"
                  size="small"
                  className="border-tag-text-blue/30 font-bold"
                >
                  {post.post_category?.name || '카테고리 없음'}
                </Tags>
              </div>

              <h6 className="h6 text-gray-1000 group-hover:text-main-500 line-clamp-2 transition-colors">
                {post.title}
              </h6>

              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-200">
                      <Image
                        onDragStart={(e) => e.preventDefault()}
                        className="object-cover"
                        alt="작성자 프로필"
                        src={post.profiles.avatar_url || defaultProfile}
                        fill
                      />
                    </div>
                    <span className="c1 font-medium tracking-tight text-gray-700">
                      {post.profiles.nickname}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Heart size={14} className="transition-colors" />
                      <p className="c1 font-semibold">{post.like_count}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageSquare size={14} className="text-icon-default" />
                      <p className="c1 font-semibold">{post.comment_count}</p>
                    </div>
                  </div>
                </div>

                <span className="c1 text-gray-600">
                  {displayDate(post.create_at)}
                </span>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CommunityCard;
