import InfoText1 from '@/components/common/Info/InfoText1';
import Tags from '@/components/common/Tags/Tags';
import { COMMUNITY_CATEGORY, COMMUNITY_TAG } from '@/constants/community';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }: { post: PostData }) => {
  const categoryKey = (post.categoryId ||
    '2') as keyof typeof COMMUNITY_CATEGORY;
  const categoryName = COMMUNITY_CATEGORY[categoryKey];

  const tagKey = (post.categoryId || '2') as keyof typeof COMMUNITY_TAG;
  const tagName = COMMUNITY_TAG[tagKey];

  return (
    <Link href={`./${post.categoryId}/${post.id}`}>
      <div className="flex h-27 w-full items-center justify-between border-b border-gray-300 px-4 py-2">
        <div className="flex h-full flex-col items-start gap-2">
          <Tags size="small" className="w-fit" color={tagName} category={true}>
            {categoryName}
          </Tags>
          <h6 className="h6 text-black">{post.title || '제목 없음'}</h6>
          <div className="flex-1" />
          <InfoText1
            image={post.author.profileImage}
            author={post.author.username}
            createdAt={post.createdAt}
            likeCount={post.stats.likeCount}
            commentCount={post.stats.commentCount}
          />
        </div>
        <div className="relative h-15 w-30 overflow-hidden bg-gray-600">
          <Image
            src={post.stats.postImage || '/example1.jpg'}
            alt="글 관련 이미지"
            className="object-cover"
            fill
            priority
          />
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
