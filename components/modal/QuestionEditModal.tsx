import { Check, X } from 'lucide-react';
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
import { useCreateQuestion } from '@/features/question/hooks/question/useCreateQuestion';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { useUpdateQuestion } from '@/features/question/hooks/question/useUpdateQuestion';
import { CategoryTypeEnums } from '@/types/entity';
import { cn } from '@/lib/utils';
import { useTechStackData } from '@/hooks/useTechStackData';
import { useDisclosure } from '@/hooks/useClickOutside';

const QuestionEditModal = () => {
  const modalData = useQuestionEditModal();
  const isEdit = modalData.isOpen && modalData.type === 'EDIT';
  const isOpen = useQuestionEditModalState();
  const { handleConfirmClose } = useConfirmCloseModal();

  const [tagInput, setTagInput] = useState('');
  const { close } = useQuestionEditModalAction();

  const router = useRouter();
  const pathname = usePathname();
  // 등록
  const { mutate: createQuesion, isPending: isCreateQuesionPending } =
    useCreateQuestion({
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

  // 수정: 달라진 데이터 있는지 비교
  const [title, setTitle] = useState(isEdit ? modalData.title : '');
  const [category, setCategory] = useState<CategoryTypeEnums | ''>(
    isEdit ? modalData.category : '',
  );
  const [tagList, setTagList] = useState<string[]>(
    isEdit ? modalData.tagList : [],
  );
  const [seletedTech, setSeletedTech] = useState<string[]>(
    isEdit ? modalData.techList || [] : [],
  );
  const checkIsDirty = () => {
    if (isEdit) {
      const isTitleChanged = title !== modalData.title;
      const isCategoryChanged = category !== modalData.category;
      const isTagsChanged =
        JSON.stringify(tagList.sort()) !==
        JSON.stringify([...modalData.tagList].sort());

      const isTechChanged =
        JSON.stringify([...seletedTech].sort()) !==
        JSON.stringify([...(modalData.techList || [])].sort());

      return (
        isTitleChanged || isCategoryChanged || isTagsChanged || isTechChanged
      );
    } else {
      return (
        title.trim() !== '' ||
        category !== '' ||
        tagList.length > 0 ||
        seletedTech.length > 0
      );
    }
  };
  const handleCloseModal = () => {
    handleConfirmClose(checkIsDirty(), title || category, close);
  };
  useEscClose(MODAL_ID.CREATE_QUESTION, isOpen, handleCloseModal);

  // 수정 훅
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

  const handleEditQuesionClick = () => {
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

    const techStackIds = techStack
      .filter((tech) => seletedTech.includes(tech.slug))
      .map((tech) => tech.id);

    if (isEdit) {
      updateQuestion({
        id: modalData.questionId,
        title,
        category: {
          category_type: category as CategoryTypeEnums,
        },
        tagList,
        techStackIds,
      });
    } else {
      createQuesion({
        title,
        category: category as CategoryTypeEnums,
        tagList,
        techStackIds,
        currentPath: pathname,
        question_type: 'user',
      });
    }
  };

  // ENTER 클릭 시 태그 추가
  const handleAddTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // IME로 인한 재생성 방지

    if (e.code === 'Enter') {
      if (tagInput.trim() === '' || tagList.includes(tagInput)) return;
      if (tagList.length >= 3) {
        toast.success('태그는 3개까지 입력 가능합니다.', {
          position: 'top-center',
        });
        return;
      }

      setTagList([...tagList, tagInput]);
      setTagInput('');
    }
  };

  // 태그 삭제
  const handleDeleteTag = (tagPrams: string) => {
    setTagList(tagList.filter((tag) => tag !== tagPrams));
  };

  // 기술 스택 관련
  const {
    containerRef,
    onClose: techClose,
    isOpen: techIsOpen,
    onOpen: techOnOpen,
  } = useDisclosure();

  const { data: techStack = [] } = useTechStackData();
  // 기술 스택 선택 (slug를 URL에 저장)
  const handleSelectTech = (slug: string) => {
    if (seletedTech.length >= 3) return alert('최대 3개까지 선택 가능합니다.');

    const newTechs = [...seletedTech, slug];
    setSeletedTech(newTechs);
    setSearchTerm('');
    techClose();
  };

  // 기술 스택 삭제
  const handleRemoveTech = (slug: string) => {
    setSeletedTech(seletedTech.filter((t) => t !== slug));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const isPending = isCreateQuesionPending || isUpdateQuestionPending;

  const tagStackFilter = techStack.filter((tag) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      !seletedTech.includes(tag.slug) &&
      (tag.slug.toLowerCase().includes(search) ||
        tag.name.toLowerCase().includes(search))
    );
  });
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
              onValueChange={(value) => setCategory(value as CategoryTypeEnums)}
            />
          </div>

          <article className="flex flex-col gap-3">
            <span className="flex gap-1 text-sm">
              <p className="text-gray-700">기술 스택</p>
            </span>
            <div className="relative" ref={containerRef}>
              <Input
                className="c1 text-gray-1000 focus:ring-main-400 border-gray-200 bg-gray-100"
                type="text"
                placeholder="기술 스택을 입력해주세요"
                value={searchTerm}
                onClick={techOnOpen}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {seletedTech.map((slug, index) => (
                  <span
                    key={slug}
                    className="bg-main-400 flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white"
                  >
                    {seletedTech[index]}
                    <button onClick={() => handleRemoveTech(slug)}>×</button>
                  </span>
                ))}
              </div>

              {techIsOpen && (
                <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {tagStackFilter.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                      {tagStackFilter.map((tech) => {
                        const isSelected = seletedTech.includes(tech.slug);
                        return (
                          <button
                            key={tech.id}
                            onClick={() => handleSelectTech(tech.slug)}
                            className={cn(
                              'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all',
                              isSelected
                                ? 'bg-main-50 text-main-600 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100',
                            )}
                          >
                            {tech.name}
                            {isSelected && <Check size={15} />}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="b2 text-gray-600">검색 결과가 없습니다.</p>
                      <p className="c1 mt-1 text-gray-500">
                        다른 키워드로 검색해 보세요.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-700">태그</p>
            <Input
              placeholder="태그를 입력하세요"
              value={tagInput}
              onKeyDown={handleAddTagKeyDown}
              onChange={(e) => setTagInput(e.target.value)}
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
            onClick={handleEditQuesionClick}
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
