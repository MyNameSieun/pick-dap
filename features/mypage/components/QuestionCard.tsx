'use client';
import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { saveQuestion } from '@/data/saveQuestion';
import { FilterType } from '@/types/FilterType';
import { Bookmark, Dot, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuestionCardProps {
  filterType: FilterType;
  searchQuery: string;
}

const QuestionCard = ({ filterType, searchQuery }: QuestionCardProps) => {

  const filteredQuestions = saveQuestion.filter((q) => {
    if (filterType === 'ALL') return true;

    const filterMap: Record<string, string> = {
      PENDING: '답변 대기',
      COMPLETED: '답변 완료',
    };

    const searchCondition = q.title.toLowerCase().trim().includes(searchQuery.trim().toLowerCase()) || q.tags.some((tag) => tag.label.toLowerCase().trim().includes(searchQuery.trim().toLowerCase()));


    const filterCondition = q.tags.some((tag) => tag.label === filterMap[filterType]);


    // 검색어가 있을 때: 검색어와 제목 또는 태그에 포함된 경우 && 필터 타입과 일치하는 경우 조건 만족
    if (searchQuery !== '') {
      return searchCondition && filterCondition
    }

    // 검색어가 없을 때: 필터 타입과 일치하는 경우 조건 만족
    return filterCondition;
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
