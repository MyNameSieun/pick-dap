'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2, ZapOff, Check, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/Button';
import Tags from '@/components/common/Tags/Tags';
import { GenerateProjectsResponse } from '../../services/fetchGenerateProjects';
import { useCreateQuestion } from '@/features/question/hooks/question/useCreateQuestion';
import { cx } from 'class-variance-authority';
import Loader from '@/components/ui/Loader';
import { QUERY_KEYS } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchInfiniteQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { useInView } from 'react-intersection-observer';

interface ProjectNextSectionProps {
  projects: GenerateProjectsResponse[];
  isPending: boolean;
  onStart: (question: GenerateProjectsResponse) => void;
  isStarting: boolean;
}

const ProjectNextSection = ({
  projects,
  isPending,
  onStart,
  isStarting,
}: ProjectNextSectionProps) => {
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
  if (isMySaveLoading) return <Loader />;

  const handleItemClick = (
    p: GenerateProjectsResponse,
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
    const selectedProjects = projects.filter((q) => selectedIds.includes(q.id));

    await toast.promise(
      Promise.all(
        selectedProjects.map((item) =>
          saveQuestion({
            title: item.question,
            category: 'Project',
            currentPath: pathname,
            tagList: item.tags,
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h5 className="h5 font-bold text-gray-900">생성된 질문</h5>
          <span className="bg-main-100/50 text-main-500 rounded-full px-3 py-0.5 text-sm font-bold">
            {projects.length}개
          </span>
        </div>

        {projects.length > 0 && (
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
              disabled={isPending || isStarting}
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
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="text-main-500 mb-4 h-10 w-10 animate-spin" />
            <p className="font-bold text-gray-900">
              AI가 프로젝트를 분석 중입니다...
            </p>
            <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
          </div>
        ) : projects.length > 0 ? (
          projects.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            const isAlreadySaved =
              savedQuestions?.some((m) => m.title === p.question) ?? false;

            return (
              <div
                key={p.id}
                onClick={() => handleItemClick(p, isAlreadySaved)}
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
                      {p.tags.map((tag, idx) => (
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

                  <p className="pr-10 text-[15px] leading-relaxed font-semibold text-gray-800 transition-all group-hover:text-black">
                    {p.question}
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
            <ZapOff size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">생성된 질문이 없습니다.</p>
            <p className="text-center text-sm">
              왼쪽에서 프로젝트를 선택하고 분석을 시작하세요!
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

export default ProjectNextSection;
