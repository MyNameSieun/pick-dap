'use client';

import Tags from '@/components/common/Tags/Tags';
import { Dot, Check } from 'lucide-react';
import Link from 'next/link';
import aiRoomsData from '@/data/aiRoomsData.json';
import {
  useEditActions,
  useIsEditMode,
  useSelectedIds,
} from '@/store/useEditStore';

const AiRoomCard = () => {
  const isEditMode = useIsEditMode();
  const selectedIds = useSelectedIds();
  const { toggleSelectedId } = useEditActions();

  const handleClickBox = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: number,
  ) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      toggleSelectedId(id);
    }
  };

  return (
    <div className="w-full border-t border-gray-200">
      {aiRoomsData.map(
        ({ id, title, createdAt, questionCnt, tags, roomId }) => {
          const isSelected = selectedIds.includes(id);

          return (
            <Link
              key={id}
              href={isEditMode ? '#' : `/interview/rooms/${roomId}`}
              onClick={(e) => handleClickBox(e, id)}
              className={`group block border-b border-gray-200 px-3 py-5 transition-all ${isEditMode ? 'cursor-default' : 'hover:bg-gray-50/50'} ${isSelected ? 'bg-blue-50/40' : 'bg-white'} `}
            >
              <article>
                <div className="flex flex-col gap-3">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {tags.map(({ label }) => (
                      <Tags
                        key={label}
                        size="small"
                        className="text-[10px] font-bold tracking-tight"
                      >
                        {label}
                      </Tags>
                    ))}
                  </div>

                  <h6 className="mb-2 truncate text-[16px] font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {title}
                  </h6>

                  <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <time>생성일: {createdAt}</time>
                    <Dot size={14} className="text-gray-300" />
                    <span className="font-bold text-gray-600">
                      질문 {questionCnt}개
                    </span>
                  </div>
                </div>

                {isEditMode && (
                  <div className="flex h-full items-center pt-1">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 shadow-sm shadow-blue-200'
                          : 'border-gray-300 bg-white group-hover:border-gray-400'
                      } `}
                    >
                      {isSelected && (
                        <Check size={14} className="stroke-[3px] text-white" />
                      )}
                    </div>
                  </div>
                )}
              </article>
            </Link>
          );
        },
      )}
    </div>
  );
};

export default AiRoomCard;
