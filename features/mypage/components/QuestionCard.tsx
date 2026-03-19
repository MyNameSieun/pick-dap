'use client';

import { Button } from '@/components/ui/button/Button';
import { QuestionWithDetails } from '@/features/question/services/question/fetchQuestion';
import { displayDate } from '@/lib/displayDate';
import { cn } from '@/lib/utils';
import { Bookmark, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuestionCard = ({ questions }: { questions: QuestionWithDetails[] }) => {
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(path);
  };

  return (
    <section className="w-full">
      {questions?.map((q) => (
        <Link
          key={q.id}
          href={`/question/${q.idx}/${q.slug}`}
          className="group block border-b border-gray-100 px-2 py-4 transition-all hover:bg-gray-50/50"
        >
          <article className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-main-400 text-[11px] font-bold tracking-wider uppercase">
                  {q.category?.category_type}
                </span>
                <span className="text-[11px] font-medium text-gray-600">
                  {displayDate(q.created_at)}
                </span>
              </div>

              <h6 className="mb-2 line-clamp-2 min-h-[2.5rem] text-[15px] font-bold break-all text-gray-900 transition-colors group-hover:text-blue-600">
                {q.title}
              </h6>

              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {q.tech_stacks.slice(0, 3).map((t) => (
                    <span
                      key={t.tech.id}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-700"
                    >
                      {t.tech.name}
                    </span>
                  ))}
                </div>

                <div
                  className={cn(
                    'flex items-center gap-2.5 text-[11px] font-medium text-gray-600',
                    q.tech_stacks.length > 0 && 'border-l border-gray-200 pl-3',
                  )}
                >
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-gray-600" />{' '}
                    {q.stats?.view_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-gray-600" />{' '}
                    {q.stats?.comment_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark
                      size={14}
                      fill={q.is_mine_bookmarked ? 'currentColor' : 'none'}
                      className={cn(
                        'transition-colors',
                        q.is_mine_bookmarked
                          ? 'text-main-300 fill-main-200/40'
                          : 'fill-transparent text-gray-400',
                      )}
                    />
                    {q.stats?.bookmark_count}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="white"
                className="h-8 border-gray-200 px-3 text-[11px] font-semibold text-gray-700"
                onClick={(e) => handleButtonClick(e, '/interview')}
              >
                연습
              </Button>
              <Button
                className="h-8 bg-gray-900 px-3 text-[11px] font-semibold text-white"
                onClick={(e) => handleButtonClick(e, '/')}
              >
                답변
              </Button>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default QuestionCard;
