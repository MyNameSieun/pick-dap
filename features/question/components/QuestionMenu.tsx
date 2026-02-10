'use client';
import { cx } from 'class-variance-authority';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { QuestionWithDetails } from '../services/fetchQuestion';
import { useQuestionEditModalAction } from '@/store/modal/useQuestionEditModal';

const QuestionMenu = (question: QuestionWithDetails) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openEdit } = useQuestionEditModalAction();

  const handleDeleteButtonClick = () => {
    setIsMenuOpen(false);
  };
  const handleEditButtonClick = () => {
    setIsMenuOpen(false);

    if (!question.category?.category_type) return;

    openEdit({
      questionId: question.id,
      title: question.title,
      category: question.category?.category_type || '',
      tagList: question.tags?.map((t) => t.tag.label) || [],
    });
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="relative">
        <button
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
