import Link from 'next/link';
import Tags from '@/components/common/Tags/Tags';
import { Bookmark, Eye } from 'lucide-react';
import { QuestionWithDetails } from '../services/question/fetchQuestion';
import Image from 'next/image';

interface QuestionCardItemProps {
  question: QuestionWithDetails;
}

const QuestionCardItem = ({ question }: QuestionCardItemProps) => {
  const {
    idx,
    slug,
    title,
    created_at,
    tags,
    stats,
    author,
    category,
    tech_stacks,
  } = question;

  return (
    <li>
      <Link href={`/question/${idx}/${slug}`}>
        <article className="hover:text-highlight-deep flex h-full flex-col justify-between rounded-[6px] border border-gray-300 p-4 transition-all duration-200">
          <div>
            {/* 상단 태그 & 통계 영역 */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-h-[32px] flex-wrap gap-2">
                {/* 카테고리 */}
                {category && (
                  <Tags key={category.category_type} color="blue" size="small">
                    {category.category_type}
                  </Tags>
                )}

                {/* 기술스택 태그 */}
                {tech_stacks?.map(
                  (tech) =>
                    tech.tech && (
                      <Tags key={tech.tech.id} color="purple" size="small">
                        {tech.tech.name}
                      </Tags>
                    ),
                )}

                {/* 추가 태그 */}
                {tags?.map(({ tag }) => {
                  if (!tag?.label) return null;
                  return (
                    <Tags key={tag.label} color="green" size="small">
                      {tag.label}
                    </Tags>
                  );
                })}
              </div>

              <div className="c2 flex items-center gap-1.5 text-gray-700">
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

            <p className="b2 my-4 line-clamp-2 min-h-[2rem] leading-relaxed font-bold">
              {title}
            </p>
          </div>

          <div className="text-icon-default c2 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full border border-gray-200">
                <Image
                  onDragStart={(e) => e.preventDefault()}
                  className="object-cover"
                  alt="작성자 프로필"
                  src={author.avatar_url || '/default-profile.png'}
                  fill
                  priority
                />
              </div>
              <p className="text-gray-900">{author.nickname}</p>
            </div>

            <time className="text-gray-500">
              {new Date(created_at).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </time>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default QuestionCardItem;
