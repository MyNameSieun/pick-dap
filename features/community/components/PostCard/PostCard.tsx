import InfoText1 from '@/components/common/Info/InfoText1';
import Image from 'next/image';
import Link from 'next/link';
import { RawPostJoined } from '../../services/fetchPostsData';

const PostCard = ({ post }: { post: RawPostJoined }) => {
  const categorySlug = post.post_category?.slug || 'all';
  const postSlug = post.slug;
  return (
    <Link href={`/community/${categorySlug}/${postSlug}`}>
      <div className="flex h-27 w-full items-center justify-between border-b border-gray-300 px-4 py-2">
        <div className="flex h-full flex-col items-start gap-2">
          {/* <Tags size="small" clasName="w-fit" color={tagName} category={true}>
            {post.content}s
          </Tags> */}
          <h6 className="h6 text-black">{post.title || '제목 없음'}</h6>
          <div className="flex-1" />
          <InfoText1
            image={post.profiles?.avatar_url || '/profile.jpg'}
            author={post.profiles?.nickname || '익명'}
            createdAt={post.create_at}
            // likeCount={post.stats.likeCount}
            // commentCount={post.stats.commentCount}
          />
        </div>
        {post.image_urls && post.image_urls[0] && (
          <div className="relative h-15 w-30 overflow-hidden bg-gray-600">
            <Image
              src={post.image_urls[0]}
              alt="글 관련 이미지"
              className="object-cover"
              fill
              priority
            />
          </div>
        )}
      </div>
    </Link>
  );
};
export default PostCard;
