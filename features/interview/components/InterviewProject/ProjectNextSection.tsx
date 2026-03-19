'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2, ZapOff, Check } from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import Tags from '@/components/common/Tags/Tags';
import { GenerateProjectsResponse } from '../../services/fetchGenerateProjects';
import { useCreateQuestion } from '@/features/question/hooks/question/useCreateQuestion';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

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

  const { mutate: saveQuestion, isPending: isSaveQuestionPending } =
    useCreateQuestion({});

  const handleChooseButton = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) setSelectedIds([]);
  };

  const handleItemClick = (p: GenerateProjectsResponse) => {
    if (isEditMode) {
      setSelectedIds((prev) =>
        prev.includes(p.id) ? prev.filter((i) => i !== p.id) : [...prev, p.id],
      );
    } else {
      onStart(p);
    }
  };

  // handleSaveQuestions 내부 수정 제안
  const handleSaveQuestions = async () => {
    const selectedQuestions = projects.filter((p) =>
      selectedIds.includes(p.id),
    );
    if (selectedQuestions.length === 0) return;

    toast.promise(
      Promise.all(
        selectedQuestions.map((item) =>
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
        loading: '질문을 저장 중입니다...',
        success: '모든 질문이 마이페이지에 저장되었습니다!',
        error: '일부 질문 저장에 실패했습니다.',
      },
    );

    setIsEditMode(false);
    setSelectedIds([]);
  };

  return (
    <div
      className={twMerge(
        'container-col',
        'w-3/5 gap-8 rounded-[32px] bg-white p-9 shadow-sm',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h5 className="h5 font-bold text-black">생성된 질문</h5>
          <span className="bg-main-100 text-main-600 rounded-full px-3 py-0.5 text-sm font-bold">
            {projects.length}개
          </span>
        </div>

        {projects.length > 0 && (
          <Button
            // variant={isEditMode ? 'primary' : 'white'}
            size="sm"
            className="font-bold"
            onClick={handleChooseButton}
            disabled={isPending || isStarting}
          >
            {isEditMode ? '선택 취소' : '질문 담기'}
          </Button>
        )}
      </div>

      <div className="custom-scrollbar flex max-h-[600px] flex-col gap-4 overflow-y-auto pr-2">
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="text-main-500 mb-4 h-10 w-10 animate-spin" />
            <p className="font-bold text-gray-900">
              AI가 프로젝트를 심층 분석 중입니다...
            </p>
            <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
          </div>
        ) : projects.length > 0 ? (
          projects.map((p) => {
            const isSelected = selectedIds.includes(p.id);

            return (
              <div
                key={p.id}
                onClick={() => handleItemClick(p)}
                className={twMerge(
                  'group relative cursor-pointer rounded-2xl border-2 p-6 transition-all',
                  isSelected
                    ? 'border-main-500 bg-main-50/30'
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

                  <p className="pr-8 text-[15px] leading-relaxed font-semibold text-gray-800">
                    {p.question}
                  </p>
                </div>

                {isEditMode && (
                  <div
                    className={twMerge(
                      'absolute top-6 right-6 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
                      isSelected
                        ? 'bg-main-500 border-main-500 text-white'
                        : 'border-gray-300 bg-white',
                    )}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
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

      {isEditMode && selectedIds.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 mt-auto flex justify-end">
          <Button
            onClick={handleSaveQuestions}
            size="lg"
            className="gap-2 px-10 font-bold shadow-xl"
            disabled={isSaveQuestionPending}
          >
            선택한 {selectedIds.length}개 질문 저장
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectNextSection;
