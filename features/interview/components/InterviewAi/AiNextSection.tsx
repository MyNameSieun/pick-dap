'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Check, ArrowRight, Lightbulb } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/Button';
import Tags from '@/components/common/Tags/Tags';
import { GenerateQuestionsResponse } from '../../services/fetchGenerateQuestions';
import { useCreateQuestion } from '@/features/question/hooks/question/useCreateQuestion';
import { cx } from 'class-variance-authority';
import AiThinkingBubble from './AiThinkingBubble';
import { CategoryTypeEnums } from '@/types/entity';
import Loader from '@/components/ui/Loader';
import { useFetchInfiniteQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { QUERY_KEYS } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

interface AiNextSectionProps {
  questions: GenerateQuestionsResponse[];
  isPending: boolean;
  onStart: (question: GenerateQuestionsResponse) => void;
  category: string | undefined;
}

const AiNextSection = ({
  questions,
  isPending,
  onStart,
  category,
}: AiNextSectionProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutateAsync: saveQuestion, isPending: isSaveQuestionPending } =
    useCreateQuestion({});

  const {
    data: mySaveQuestion,
    isPending: isMySaveLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteQuestionData();

  const { ref, inView } = useInView({ threshold: 0.1 });

  const savedQuestions = mySaveQuestion?.pages.flatMap((page) => page);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleChooseButton = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) setSelectedIds([]);
  };

  if (isMySaveLoading || isMySaveLoading || !savedQuestions) return <Loader />;

  const handleItemClick = (
    p: GenerateQuestionsResponse,
    isAlreadySaved: boolean,
  ) => {
    if (isAlreadySaved && isEditMode) return;

    if (isEditMode) {
      setSelectedIds((prev) =>
        prev.includes(p.id) ? prev.filter((i) => i !== p.id) : [...prev, p.id],
      );
    } else {
      onStart(p);
    }
  };
  const handleSaveQuestions = async () => {
    const selectedQuestions = questions.filter((q) =>
      selectedIds.includes(q.id),
    );

    await toast.promise(
      Promise.all(
        selectedQuestions.map((item) =>
          saveQuestion({
            title: item.question,
            category: category as CategoryTypeEnums,
            currentPath: pathname,
            tagList: item.tags || [],
            techStackIds: [],
            question_type: 'pickbot',
          }),
        ),
      ),
      {
        loading: '질문을 보관함에 담는 중...',
        success: '선택한 질문이 마이페이지에 저장되었습니다!',
        error: '저장 중 오류가 발생했습니다.',
        position: 'top-center',
      },
    );

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.question.mySaveList(),
    });

    setIsEditMode(false);
    setSelectedIds([]);
  };

  return (
    <div
      className={twMerge('container-col', 'w-3/5 gap-8 bg-white p-9 shadow-sm')}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h5 className="h5 font-bold text-gray-900">생성된 질문</h5>
          {questions.length > 0 && (
            <span className="bg-main-100/50 text-main-500 rounded-full px-3 py-0.5 text-sm font-bold">
              {questions.length}개
            </span>
          )}
        </div>

        {questions.length > 0 && (
          <div className="flex items-center gap-2">
            {isEditMode && selectedIds.length > 0 && (
              <Button
                onClick={handleSaveQuestions}
                disabled={isSaveQuestionPending}
                className="animate-in fade-in zoom-in-95 font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {selectedIds.length}개 저장하기
              </Button>
            )}

            <Button
              onClick={handleChooseButton}
              disabled={isPending}
              className={cx(
                'px-4 py-2 font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
                isEditMode
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-main-100/50 text-main-400 hover:bg-main-200/50',
              )}
            >
              {isEditMode ? '선택 취소' : '질문 담기'}
            </Button>
          </div>
        )}
      </div>

      <div className="custom-scrollbar flex max-h-[600px] flex-col gap-4 overflow-y-auto pr-2">
        {isPending ? (
          <div className="py-10">
            <AiThinkingBubble />
          </div>
        ) : questions.length > 0 ? (
          questions.map((item, index) => {
            const isSelected = selectedIds.includes(item.id);
            const isAlreadySaved =
              savedQuestions?.some((m) => m.title === item.question) ?? false;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item, isAlreadySaved)}
                className={twMerge(
                  'group relative cursor-pointer rounded-2xl border-2 p-6 transition-all',
                  isAlreadySaved && isEditMode && 'opacity-60',
                  isSelected
                    ? 'border-main-300 bg-main-50/30'
                    : 'hover:border-main-200 border-gray-50 bg-gray-50/50',
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-main-400 text-md mr-1 font-bold">
                        Q{index + 1}.
                      </span>
                      {item.tags?.map((tag, idx) => (
                        <Tags
                          key={idx}
                          size="small"
                          className="text-[10px] font-bold"
                        >
                          {tag}
                        </Tags>
                      ))}
                    </div>
                  </div>

                  <p className="pr-20 text-[15px] leading-relaxed font-semibold text-gray-900 transition-all group-hover:text-black">
                    {item.question}
                  </p>
                </div>

                {isEditMode && !isAlreadySaved ? (
                  <div
                    className={twMerge(
                      'absolute top-6 right-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-200 transition-all',
                      isSelected
                        ? 'bg-main-300 border-main-300 text-white'
                        : 'border-gray-300 bg-white',
                    )}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                ) : (
                  <div className="text-main-500 absolute right-6 bottom-6 flex translate-y-1 items-center gap-1.5 text-[13px] font-bold opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    면접 시작 <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300">
            <Lightbulb size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-bold text-gray-400">
              생성된 질문이 없습니다.
            </p>
            <p className="text-center text-sm text-gray-400">
              옵션을 선택하고 AI 맞춤형 질문을 생성해보세요!
            </p>
          </div>
        )}
      </div>

      <div ref={ref} className="flex w-full items-center justify-center py-8">
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
};

export default AiNextSection;
