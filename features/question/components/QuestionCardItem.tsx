import Link from 'next/link';
import Tags from '@/components/common/Tags/Tags';
import { Bookmark, Eye } from 'lucide-react';
import { QuestionWithDetails } from '../services/fetchQuestion';
import Image from 'next/image';

interface QuestionCardItemProps {
  question: QuestionWithDetails;
}

const QuestionCardItem = ({ question }: QuestionCardItemProps) => {
  const { id, title, created_at, tags, stats, author, category } = question;

  return (
    <li>
      <Link href={`/question/${id}`}>
        <article className="hover:text-highlight-deep rounded-[6px] border border-gray-300 p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {/* 카테고리 배지 추가 */}
              {category && (
                <Tags key={category.category_type} color="blue" size="small">
                  {category.category_type}
                </Tags>
              )}
              {tags.map(({ tag }) => (
                <Tags key={tag.label} color="blue" size="small">
                  {tag.label}
                </Tags>
              ))}
            </div>
            <div className="c2 flex items-center gap-1 text-gray-700">
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {stats?.view_count ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark size={14} />
                {stats?.bookmark_count ?? 0}
              </span>
            </div>
          </div>

          <p className="b2 my-3 line-clamp-2 font-bold">{title}</p>

          <div className="text-icon-default c2 mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full border">
                <Image
                  onDragStart={(e) => e.preventDefault()} // 드래그 이벤트 차단
                  className="object-cover"
                  alt="작성자 프로필"
                  src={author.avatar_url || '/default-profile.png'}
                  fill
                  priority
                />
              </div>
              <p>{author.nickname}</p>
            </div>

            <time>{new Date(created_at).toLocaleDateString()}</time>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default QuestionCardItem;
