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
import SelectCustom from '../common/SelectCustom';
import { jobCategories } from '@/constants/jobCategories';
import { JobCategory } from '@/types/jobCategory';
import { useCreateQuesion } from '@/features/question/hooks/useCreateQuesion';
import { toast } from 'sonner';

const CreateQuestionModal = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory | ''>('');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const { close } = useCreateQuestionModalAction();
  const isOpen = useCreateQuestionModalState();

  const { handleConfirmClose } = useConfirmCloseModal();

  const handleCloseModal = () => {
    handleConfirmClose(title || category, close);
  };

  useEscClose(MODAL_ID.CREATE_QUESTION, isOpen, handleCloseModal);

  const { mutate: createQuesion, isPending: isCreateQuesionPending } =
    useCreateQuesion({
      onSuccess: () => {
        toast.success('질문이 등록되었습니다.', {
          position: 'top-center',
        });
        close();
      },
      onError: (error) => {
        toast.error('질문 생성에 실패했습니다.', {
          position: 'top-center',
        });
        console.error('등록 실패 원인:', error);
      },
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.code === 'Enter') {
      console.log('Enter');

      if (tag.trim() === '' || tagList.includes(tag)) return;
      setTagList([...tagList, tag]);
      setTag('');
    }
  };

  const handleDeleteTag = (tagPrams: string) => {
    setTagList(tagList.filter((tag) => tag !== tagPrams));
  };

  const handleCreateQuesionClick = () => {
    if (title.trim() === '' || category.trim() === '') return;
    createQuesion({ title, category, tagList });
  };

  return (
    <div onClick={handleCloseModal} className="modal-layout">
      <section
        className="w-[600px] rounded-[16px] bg-white p-9 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text- gray-1000">질문 등록</h2>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="질문을 입력하세요"
              disabled={isCreateQuesionPending}
            />
          </div>

          {/* 카테고리 */}
          <div className="flex flex-col gap-1">
            <span className="flex gap-1 text-sm">
              <p className="text-gray-700">카테고리</p>
              <p className="text-point-star">*</p>
            </span>

            <SelectCustom
              options={jobCategories.map((j) => ({
                label: j,
                value: j,
              }))}
              placeholder="카테고리를 선택하세요"
              className="w-full"
              onValueChange={(value) => setCategory(value as JobCategory)}
            />
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-700">태그</p>
            <Input
              placeholder="태그를 입력하세요"
              value={tag}
              onKeyDown={handleKeyDown}
              onChange={(e) => setTag(e.target.value)}
              disabled={isCreateQuesionPending}
            />
            <ul className="mt-1 flex flex-wrap gap-2">
              {tagList.map((tag, idx) => (
                <li key={idx}>
                  <span className="flex items-center gap-1 rounded-xl bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    <span>#</span>
                    {tag}
                    <X
                      className="ml-1 cursor-pointer transition-colors hover:text-red-500"
                      size={15}
                      onClick={() => handleDeleteTag(tag)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <div className="mt-3 flex w-full justify-end">
          <Button onClick={handleCreateQuesionClick} className="px-6">
            등록
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CreateQuestionModal;
