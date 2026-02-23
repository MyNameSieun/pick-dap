import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { Bookmark, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { QuestionWithDetails } from '../../services/question/fetchQuestion';
import { useDeleteQuestion } from '../../hooks/question/useDeleteQuestion';
import MoreOptionsMenu from '@/components/common/MoreOptionsMenu';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';
import { useRouter } from 'next/navigation';
import { useToggleBookmark } from '../../hooks/question/useBookmark';
import { cn } from '@/lib/utils';

interface QuestionContentHeaderProps {
  question: QuestionWithDetails;
  isAuthor: boolean;
}

const QuestionContentHeader = ({
  question,
  isAuthor,
}: QuestionContentHeaderProps) => {
  const router = useRouter();

  const { mutate: bookmark } = useToggleBookmark();

  const questionId = question.id;
  const questionIdx = question.idx;
  const onClickSaveButtonHandler = () => {
    bookmark({ questionId, questionIdx });
    toast.success('마이페이지에 저장이 완료되었습니다!', {
      position: 'top-center',
    });
  };
  // 삭제
  const { mutate: deleteQuestion, isPending: isDeleteQuestionPending } =
    useDeleteQuestion({
      onSuccess: () => {
        toast.success('질문이 삭제되었습니다.', {
          position: 'top-center',
        });
        router.replace(`/question`);
      },
      onError: (error) => {
        toast.error('질문 삭제에 실패했습니다.', {
          position: 'top-center',
        });
        console.error('삭제 실패 원인:', error);
      },
    });

  const handleDeleteButtonClick = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    deleteQuestion(question.idx);
  };

  // 수정
  const { openEdit } = useQuestionEditModalAction();

  const handleEditButtonClick = () => {
    if (!question.category?.category_type) return;

    openEdit({
      questionId: question.id,
      title: question.title,
      category: question.category?.category_type || '',
      tagList: question.tags?.map((t) => t.tag.label) || [],
      techList: question.tech_stacks?.map((ts) => ts.tech.slug) || [],
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {question.category?.category_type && (
            <Tags size="big">{question.category.category_type}</Tags>
          )}
          {question.tech_stacks.map(({ tech }) => (
            <Tags color="purple" key={tech.id} size="big">
              {tech.name}
            </Tags>
          ))}
          {question.tags.map(({ tag }) => (
            <Tags color="green" key={tag.label} size="big">
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
            <Bookmark
              className={cn(
                'transition-colors',
                question.is_mine_bookmarked
                  ? 'fill-blue-400 text-blue-400'
                  : 'text-gray-400 group-hover/like:text-gray-400',
              )}
            />
            {question.stats?.bookmark_count ?? 0}
          </Button>
          {isAuthor && (
            <MoreOptionsMenu>
              <button
                onClick={handleEditButtonClick}
                className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
              >
                <Pencil
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600"
                />
                <span>수정하기</span>
              </button>

              <button
                disabled={isDeleteQuestionPending}
                onClick={handleDeleteButtonClick}
                className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                <Trash2
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600 hover:bg-gray-100"
                />
                <span>삭제하기</span>
              </button>
            </MoreOptionsMenu>
          )}
        </div>
      </div>
      <h2 className="my-6">{question.title}</h2>
    </div>
  );
};

export default QuestionContentHeader;
