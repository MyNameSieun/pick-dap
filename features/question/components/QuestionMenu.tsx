'use client';
import { cx } from 'class-variance-authority';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { QuestionWithDetails } from '../services/fetchQuestion';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';
import { useDeleteQuestion } from '../hooks/useDeleteQuestion';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface QuestionMenuProps {
  question: QuestionWithDetails;
}
const QuestionMenu = ({ question }: QuestionMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    setIsMenuOpen(false);
    deleteQuestion(String(question.idx));
  };

  // 수정
  const handleEditButtonClick = () => {
    setIsMenuOpen(false);

    if (!question.category?.category_type) return;

    openEdit({
      questionId: question.id,
      title: question.title,
      category: question.category?.category_type || '',
      tagList: question.tags?.map((t) => t.tag.label) || [],
    });
  };

  return (
    <div>
      <div className="relative">
        <button
          disabled={isDeleteQuestionPending}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cx(
            'flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100',
            isMenuOpen ? 'bg-gray-100' : '',
          )}
        >
          <EllipsisVertical size={20} className="text-gray-900" />
        </button>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* 드롭다운 박스 */}
            <div className="absolute right-0 z-20 mt-2 w-32 origin-top-right rounded-xl border border-gray-100 bg-white p-1.5 text-gray-900 shadow-lg ring-1 ring-black/5">
              <button
                onClick={handleEditButtonClick}
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
              >
                수정하기
              </button>
              <button
                disabled={isDeleteQuestionPending}
                onClick={handleDeleteButtonClick}
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
              >
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionMenu;
