'use client';
import { Pencil, Trash2 } from 'lucide-react';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { QuestionWithDetails } from '../../services/question/fetchQuestion';
import { useDeleteQuestion } from '../../hooks/question/useDeleteQuestion';
import MoreOptionsMenu from '@/components/common/MoreOptionsMenu';
interface QuestionMenuProps {
  question: QuestionWithDetails;
}
const QuestionMenu = ({ question }: QuestionMenuProps) => {
  const { openEdit } = useQuestionEditModalAction();

  const router = useRouter();
  const { mutate: deleteQuestion, isPending: isDeleteQuestionPending } =
    useDeleteQuestion({
      onSuccess: () => {
        toast.success('질문이 삭제되었습니다.', {
          position: 'top-center',
        });
        router.push(`/question`);
      },
      onError: (error) => {
        toast.error('질문 삭제에 실패했습니다.', {
          position: 'top-center',
        });
        console.error('삭제 실패 원인:', error);
      },
    });

  // 삭제
  const handleDeleteButtonClick = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    deleteQuestion(question.idx);
  };

  // 수정
  const handleEditButtonClick = () => {
    if (!question.category?.category_type) return;

    openEdit({
      questionId: question.id,
      title: question.title,
      category: question.category?.category_type || '',
      tagList: question.tags?.map((t) => t.tag.label) || [],
    });
  };

  return (
    <MoreOptionsMenu>
      {/* 수정하기 버튼 */}
      <button
        onClick={handleEditButtonClick}
        className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
      >
        <Pencil size={16} className="text-gray-400 group-hover:text-gray-600" />
        <span>수정하기</span>
      </button>

      {/* 삭제하기 버튼 */}
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
  );
};

export default QuestionMenu;
