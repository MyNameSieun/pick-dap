'use client';
import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import Loader from '@/components/ui/Loader';
import { useFetchMyQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { useQuestionFilters } from '@/features/question/hooks/question/useQuestionFilters';
import { Bookmark, Dot, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuestionCard = () => {
  const router = useRouter();

  const filters = useQuestionFilters();

  const { data: questions, isPending: isQuestionPending } =
    useFetchMyQuestionData(filters);

  if (isQuestionPending) return <Loader />;

  const handleButtonClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(path);
  };

  return (
    <section>
      {questions?.map((q) => (
        <Link key={q.id} href={'/question/3'}>
          <article className="card-col-no-border">
            <div className="flex">
              <Tags className="mr-1" size="big">
                {q.category?.category_type || ''}
              </Tags>

              <div className="flex flex-wrap">
                {q.tech_stacks.map((t) => (
                  <Tags
                    key={t.tech.id}
                    className="mr-1"
                    color="purple"
                    size="big"
                  >
                    {t.tech.name}
                  </Tags>
                ))}
              </div>

              <div className="flex flex-wrap">
                {q.tags.map((tag) => (
                  <Tags
                    key={tag.tag.label}
                    className="mr-1"
                    size="big"
                    color="green"
                  >
                    {tag.tag.label}
                  </Tags>
                ))}
              </div>
            </div>

            <h6 className="h6 text-gray-1000">{q.title}</h6>

            <div className="text-icon-default c1 flex items-center justify-between">
              <div className="flex gap-2">
                <time className="">답변일: {q.created_at}</time>
                <Dot size={15} />
                <div className="flex gap-3">
                  <div className="flex items-center gap-0.5">
                    <Eye size={12} />
                    <p>{q.stats?.view_count}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Bookmark size={12} />
                    <p>{q.stats?.bookmark_count}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MessageSquare size={12} />
                    <p>{q.stats?.comment_count}</p>
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
