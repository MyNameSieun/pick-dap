'use client';

import { Bookmark, Calendar, Loader2, X } from 'lucide-react';
import Tags from '../common/Tags/Tags';
import { useEscClose } from '@/hooks/useEscClose';
import { MODAL_ID } from '@/constants/modalNames';
import {
  useSaveQuestionModalAction,
  useSaveQuestionModalState,
} from '@/store/modal/saveQuestionModal';
import { useFetchMySaveQuestionData } from '@/features/question/hooks/question/useFetchQuestionData';
import { displayDate } from '@/lib/displayDate';
import { useCreateInterview } from '@/features/interview/hooks/useCreateAiInterview';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CategoryTypeEnums } from '@/types/entity';
import { QuestionWithDetails } from '@/features/question/services/question/fetchQuestion';

const SavedQuestionsModal = () => {
  const router = useRouter();
  const isOpen = useSaveQuestionModalState();
  const { close } = useSaveQuestionModalAction();

  useEscClose(MODAL_ID.SAVE_QUESTION, isOpen, close);

  const { data: mySaveQuestionData, isPending: isMySaveQuestionPending } =
    useFetchMySaveQuestionData();

  const { mutate: startInterview, isPending: isStartPending } =
    useCreateInterview({
      onSuccess: (data) => {
        close();
        router.push(`/interview/ai/room/${data?.id}`);
      },
      onError: () => {
        toast.error('면접 방 생성에 실패했습니다.');
      },
    });

  if (!isOpen) return null;

  const handleStartInterview = (question: QuestionWithDetails) => {
    if (!question.category) {
      toast.error('카테고리 정보가 없는 질문입니다. 다시 시도해 주세요.');
      return;
    }
    startInterview({
      categoryType: question.category.category_type as CategoryTypeEnums,
      questionId: question.id,
      initialQuestion: question.title,
    });
  };

  return (
    <div
      className="modal-layout z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={close}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="animate-in fade-in zoom-in relative flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl duration-300"
      >
        {isStartPending && (
          <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <Loader2 className="text-main-500 h-10 w-10 animate-spin" />
            <p className="mt-4 font-bold text-gray-900">
              면접을 준비하고 있어요...
            </p>
          </div>
        )}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-8 py-7 backdrop-blur-md">
          <div>
            <h2 className="text-[24px] font-extrabold tracking-tight text-gray-900">
              저장된 질문 불러오기
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              북마크한 질문으로 실전처럼 연습해 보세요.
            </p>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-90"
          >
            <X size={26} />
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8">
          {isMySaveQuestionPending ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
            </div>
          ) : mySaveQuestionData && mySaveQuestionData.length > 0 ? (
            <div className="grid gap-5">
              {mySaveQuestionData.map((savedQuestion) => (
                <article
                  key={savedQuestion.id}
                  onClick={() => handleStartInterview(savedQuestion)}
                  className="group hover:border-main-500/40 hover:bg-main-50/20 relative flex cursor-pointer flex-col gap-4 rounded-[22px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
                >
                  <div className="flex flex-wrap gap-1.5">
                    <Tags
                      size="small"
                      color="blue"
                      className="px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase"
                    >
                      {savedQuestion.category?.category_type}
                    </Tags>

                    {savedQuestion.tags.map((t) => (
                      <Tags
                        key={t.tag.label}
                        size="small"
                        color="gray"
                        className="bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold text-gray-600"
                      >
                        {t.tag.label}
                      </Tags>
                    ))}
                  </div>

                  <h5 className="group-hover:text-main-600 pr-10 text-[18px] leading-snug font-bold text-gray-900 transition-colors">
                    {savedQuestion.title}
                  </h5>

                  <div className="flex items-center gap-4 text-[13px] font-semibold text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Bookmark
                        size={15}
                        className="text-main-500 fill-main-500/10"
                      />
                      <span className="text-main-600">
                        {savedQuestion.total_bookmark_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={15} className="text-gray-400" />
                      <time className="tabular-nums">
                        {displayDate(savedQuestion.created_at)}
                      </time>
                    </div>
                  </div>

                  <div className="text-main-500 absolute right-6 bottom-6 flex translate-x-2 items-center gap-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="text-[13px] font-bold">연습하기</span>
                    <span className="text-lg">→</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Bookmark size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-bold">저장된 질문이 없습니다.</p>
              <p className="text-sm">
                마음에 드는 질문을 먼저 북마크해 보세요!
              </p>
            </div>
          )}
        </div>

        <div className="pointer-events-none sticky bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
      </section>
    </div>
  );
};

export default SavedQuestionsModal;
