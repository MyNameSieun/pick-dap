// components/modal/CreateQuestionModal.tsx
import { X } from 'lucide-react';
import Line from '../common/Line';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';
import { useConfirmCloseModal } from '@/hooks/useConfirmCloseModal';
import { useState } from 'react';
import { useEscClose } from '@/hooks/useEscClose';
import {
  useCreateQuestionModalAction,
  useCreateQuestionModalState,
} from '@/store/modal/createQuestionModal';
import { MODAL_ID } from '@/constants/modalNames';

const CreateQuestionModal = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const { close } = useCreateQuestionModalAction();
  const isOpen = useCreateQuestionModalState();

  const { handleConfirmClose } = useConfirmCloseModal();

  const handleCloseModal = () => {
    handleConfirmClose(content || category, close);
  };

  useEscClose(MODAL_ID.CREATE_QUESTION, isOpen, handleCloseModal);

  return (
    <div onClick={handleCloseModal} className="modal-layout">
      <section
        className="w-[600px] rounded-[16px] bg-white p-9 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text- gray-1000">질문 입력</h2>
          <X
            onClick={handleCloseModal}
            className="text-icon-default cursor-pointer"
            size={24}
          />
        </div>

        <Line my={4} color="gray300" />

        <article className="flex flex-col gap-4">
          {/* 질문 */}
          <div className="flex flex-col gap-1">
            <span className="flex gap-1 text-sm">
              <p className="text-gray-700">질문</p>
              <p className="text-point-star">*</p>
            </span>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="질문을 입력하세요"
            />
          </div>

          {/* 카테고리 */}

          <div className="flex flex-col gap-1">
            <span className="flex gap-1 text-sm">
              <p className="text-gray-700">카테고리</p>
              <p className="text-point-star">*</p>
            </span>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="카테고리를 입력하세요 "
            />
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-700">태그</p>
            <Input placeholder="태그를 선택하세요" />
          </div>
        </article>
        <div className="mt-3 flex w-full justify-end">
          <Button className="px-6">등록</Button>
        </div>
      </section>
    </div>
  );
};

export default CreateQuestionModal;
