import { X } from 'lucide-react';
import Line from '../common/Line';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';
import { useConfirmCloseModal } from '@/hooks/useConfirmCloseModal';
import { useState } from 'react';
import { useEscClose } from '@/hooks/useEscClose';
import {
  useQuestionEditModal,
  useQuestionEditModalAction,
  useQuestionEditModalState,
} from '@/store/modal/useQuestionEditModal';
import { MODAL_ID } from '@/constants/modalNames';
import SelectCustom from '../common/SelectCustom';
import { jobCategories } from '@/constants/jobCategories';
import { useCreateQuesion } from '@/features/question/hooks/question/useCreateQuesion';
import { toast } from 'sonner';
import { CategoryType } from '@/types/entity';
import { useRouter } from 'next/navigation';
import { useUpdateQuestion } from '@/features/question/hooks/question/useUpdateQuestion';

const QuestionEditModal = () => {
  const modalData = useQuestionEditModal();
  const isEdit = modalData.isOpen && modalData.type === 'EDIT';
  const isOpen = useQuestionEditModalState();

  const [title, setTitle] = useState(isEdit ? modalData.title : '');
  const [category, setCategory] = useState<CategoryType | ''>(
    isEdit ? modalData.category : '',
  );
  const [tagList, setTagList] = useState<string[]>(
    isEdit ? modalData.tagList : [],
  );
  const [tag, setTag] = useState('');
  const { close } = useQuestionEditModalAction();

  const { handleConfirmClose } = useConfirmCloseModal();

  // 달라진 데이터 있는지 비교
  const checkIsDirty = () => {
    if (isEdit) {
      // 수정 모드일 때 (스토어에 저장된 데이터랑 비교)
      const isTitleChanged = title !== modalData.title;
      const isCategoryChanged = category !== modalData.category;
      const isTagsChanged =
        JSON.stringify(tagList) !== JSON.stringify(modalData.tagList);

      return isTitleChanged || isCategoryChanged || isTagsChanged;
    } else {
      return title.trim() !== '' || category !== '' || tagList.length > 0;
    }
  };

  const handleCloseModal = () => {
    handleConfirmClose(checkIsDirty(), title || category, close);
  };

  const router = useRouter();

  useEscClose(MODAL_ID.CREATE_QUESTION, isOpen, handleCloseModal);

  // 등록
  const { mutate: createQuesion, isPending: isCreateQuesionPending } =
    useCreateQuesion({
      onSuccess: (newQuestion) => {
        toast.success('질문이 등록되었습니다.', {
          position: 'top-center',
        });
        router.push(`/question/${newQuestion?.idx}/${newQuestion?.slug}`);
        close();
      },
      onError: (error) => {
        toast.error('질문 생성에 실패했습니다.', {
          position: 'top-center',
        });
        console.error('등록 실패 원인:', error);
      },
    });

  // 수정
  const { mutate: updateQuestion, isPending: isUpdateQuestionPending } =
    useUpdateQuestion({
      onSuccess: () => {
        toast.success('질문이 수정 되었습니다.', {
          position: 'top-center',
        });
        close();
      },
      onError: (error) => {
        toast.error('질문 수정에 실패했습니다.', {
          position: 'top-center',
        });
        console.error('등록 실패 원인:', error);
      },
    });

  // 버튼 클릭시 수정/삭제 모드 결정 후 질문 추가
  const handleCreateQuesionClick = () => {
    if (title.trim() === '') {
      toast.success('질문을 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    if (category.trim() === '') {
      toast.success('카테고리를 선택해주세요.', {
        position: 'top-center',
      });
      return;
    }

    if (isEdit) {
      updateQuestion({
        id: modalData.questionId,
        title,
        category: {
          category_type: category as CategoryType,
        },
        tagList,
      });
    } else {
      // 생성 모드
      createQuesion({ title, category: category as CategoryType, tagList });
    }
  };

  // ENTER 클릭 시 태그 추가
  const handleAddTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // IME로 인한 재생성 방지

    if (e.code === 'Enter') {
      if (tag.trim() === '' || tagList.includes(tag)) return;
      if (tagList.length >= 3) {
        toast.success('태그는 3개까지 입력 가능합니다.', {
          position: 'top-center',
        });
        return;
      }

      setTagList([...tagList, tag]);
      setTag('');
    }
  };

  // 태그 삭제
  const handleDeleteTag = (tagPrams: string) => {
    setTagList(tagList.filter((tag) => tag !== tagPrams));
  };

  const isPending = isCreateQuesionPending || isUpdateQuestionPending;

  return (
    <div onClick={handleCloseModal} className="modal-layout">
      <section
        className="w-[600px] rounded-[16px] bg-white p-9 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-gray-1000">
            {isEdit ? '질문 수정' : '질문 등록'}
          </h2>
          <X
            onClick={handleCloseModal}
            className="text-icon-default cursor-pointer"
            size={24}
          />
        </div>

        <Line my={4} color="gray300" />

        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="flex gap-1 text-sm">
              <p className="text-gray-700">질문</p>
              <p className="text-point-star">*</p>
            </span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="질문을 입력하세요"
              disabled={isPending}
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
              value={category}
              onValueChange={(value) => setCategory(value as CategoryType)}
            />
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-700">태그</p>
            <Input
              placeholder="태그를 입력하세요"
              value={tag}
              onKeyDown={handleAddTagKeyDown}
              onChange={(e) => setTag(e.target.value)}
              disabled={isPending}
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
          <Button
            disabled={isPending || title == '' || category == ''}
            onClick={handleCreateQuesionClick}
            className="px-6"
          >
            {isEdit ? '수정 완료' : '등록'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default QuestionEditModal;
