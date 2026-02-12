import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import QuestionMenu from './QuestionMenu';
import { QuestionWithDetails } from '../services/fetchQuestion';

interface QuestionContentHeaderProps {
  question: QuestionWithDetails;
  isAuthor: boolean;
}

const QuestionContentHeader = ({
  question,
  isAuthor,
}: QuestionContentHeaderProps) => {
  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장이 완료되었습니다!', {
      position: 'top-center',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {question.category?.category_type && (
            <Tags color="blue" size="big">
              {question.category.category_type}
            </Tags>
          )}
          {question.tags.map(({ tag }) => (
            <Tags key={tag.label} size="big">
              {tag.label}
            </Tags>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={'white'}
            className="h-10.5"
            onClick={onClickSaveButtonHandler}
          >
            <Bookmark />
            {question.stats?.bookmark_count ?? 0}
          </Button>
          {isAuthor && <QuestionMenu question={question} />}
        </div>
      </div>
      <h2 className="mt-8 mb-15">{question.title}</h2>
    </div>
  );
};

export default QuestionContentHeader;
