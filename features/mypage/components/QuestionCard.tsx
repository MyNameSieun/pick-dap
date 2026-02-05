'use client';
import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { savedQuestions } from '@/data/savedQuestions';
import { FilterType } from '@/types/FilterType';
import { Bookmark, Dot, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuestionCardProps {
  filterType: FilterType;
  searchQuery: string;
}

const QuestionCard = ({ filterType, searchQuery }: QuestionCardProps) => {
  const filteredQuestions = savedQuestions.filter((q) => {
    // 1. 필터 조건
    const filterMap: Record<string, string> = {
      PENDING: '답변 대기',
      COMPLETED: '답변 완료',
    };

    const filterCondition =
      filterType === 'ALL'
        ? true
        : q.tags.some((tag) => tag.label === filterMap[filterType]);

    // 2. 검색 조건
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const searchCondition =
      normalizedQuery === ''
        ? true
        : q.title.toLowerCase().includes(normalizedQuery) ||
          q.tags.some((tag) =>
            tag.label.toLowerCase().includes(normalizedQuery),
          );

    // 3. 두 조건 모두 만족해야 함
    return filterCondition && searchCondition;
  });

  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(path);
  };

  return (
    <section>
      {filteredQuestions.map((q) => (
        <Link key={q.id} href={'/question/3'}>
          <article className="card-col-no-border">
            <div className="flex flex-wrap">
              {q.tags.map((tag) => (
                <Tags key={tag.label} className="mr-1" size="big">
                  {tag.label}
                </Tags>
              ))}
            </div>

            <h6 className="h6 text-gray-1000">{q.title}</h6>

            <div className="text-icon-default c1 flex items-center justify-between">
              <div className="flex gap-2">
                <time className="">답변일: {q.createdAt}</time>
                <Dot size={15} />
                <div className="flex gap-3">
                  <div className="flex items-center gap-0.5">
                    <Eye size={12} />
                    <p>{q.stats.views}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Bookmark size={12} />
                    <p>{q.stats.bookmarks}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MessageSquare size={12} />
                    <p>{q.stats.comments}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-1 font-bold">
                <Button
                  className="h-10"
                  onClick={(e) => handleButtonClick(e, '/')}
                >
                  답변하기
                </Button>
                <Button
                  variant={'white'}
                  className="h-10"
                  onClick={(e) => handleButtonClick(e, '/interview')}
                >
                  면접 연습
                </Button>
              </div>
            </div>
          </article>
          <Line />
        </Link>
      ))}
    </section>
  );
};

export default QuestionCard;
