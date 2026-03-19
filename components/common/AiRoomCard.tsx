'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import Tags from '@/components/common/Tags/Tags';
import Loader from '../ui/Loader';
import {
  useEditActions,
  useIsEditMode,
  useSelectedIds,
} from '@/store/useEditStore';
import { useFetchMyAiInterviews } from '@/features/interview/hooks/useFetchAiInterview';
import { displayDate } from '@/lib/displayDate';

const AiRoomCard = () => {
  const isEditMode = useIsEditMode();
  const selectedIds = useSelectedIds();
  const { toggleSelectedId } = useEditActions();
  const { data: myInterviews, isPending } = useFetchMyAiInterviews();

  if (isPending) return <Loader />;

  if (!myInterviews || myInterviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="b1 font-medium">아직 진행한 면접이 없습니다.</p>
        <p className="b2 mt-1">AI와 함께 첫 면접 연습을 시작해보세요!</p>
      </div>
    );
  }

  const handleBoxClick = (e: React.MouseEvent, id: string) => {
    if (isEditMode) {
      e.preventDefault();
      toggleSelectedId(id);
    }
  };

  return (
    <div className="w-full border-t border-gray-200">
      {myInterviews.map((room) => {
        const { id, category_type, created_at, status, title } = room;
        const isSelected = selectedIds.includes(id);

        return (
          <Link
            key={id}
            href={isEditMode ? '#' : `/interview/ai/room/${id}`}
            onClick={(e) => handleBoxClick(e, id)}
            className={`group block border-b border-gray-200 px-3 py-5 transition-all ${isEditMode ? 'cursor-default' : 'hover:bg-gray-50/50'} ${isSelected ? 'bg-blue-50/40' : 'bg-white'}`}
          >
            <article className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1.5">
                  <Tags size="small" className="text-[10px] font-bold">
                    {category_type}
                  </Tags>
                  <Tags
                    size="small"
                    color={status === 'COMPLETED' ? 'green' : 'yellow'}
                    className="text-[10px] font-bold"
                  >
                    {status === 'COMPLETED' ? '완료' : '진행 중'}
                  </Tags>
                </div>

                <h6 className="text-[16px] font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {title}
                </h6>
                <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                  <time>생성일: {displayDate(created_at)}</time>
                </div>
              </div>

              {isEditMode && (
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isSelected ? 'border-blue-600 bg-blue-600 shadow-sm' : 'border-gray-300 bg-white'}`}
                >
                  {isSelected && (
                    <Check size={14} className="stroke-[3px] text-white" />
                  )}
                </div>
              )}
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default AiRoomCard;
