'use client';

import Tags from '@/components/common/Tags/Tags';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import aiRoomsData from '@/data/aiRoomsData.json';
import { SetStateAction, useState } from 'react';
import { cn } from '@/lib/utils';
import SelectCountBox from './SelectCountBox/SelectCountBox';

interface AiRoomCardProps {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
}

const AiRoomCard = ({ isEditMode, setIsEditMode }: AiRoomCardProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };
  return (
    <>
      {isEditMode === false ? null : (
        <SelectCountBox
          setIsEditMode={setIsEditMode}
          setSelectedIds={setSelectedIds}
          state="delete"
          count={selectedIds.length}
        />
      )}

      {aiRoomsData.map(
        ({ id, title, createdAt, questionCnt, tags, roomId }) => {
          const isCurrentSelected = selectedIds.includes(id);

          return (
            <Link
              key={id}
              href={`/interview/rooms/${roomId}`}
              onClick={(e) => {
                if (isEditMode) {
                  e.preventDefault();
                  toggleSelect(id);
                }
              }}
            >
              <article
                className={cn(
                  'card-col',
                  isEditMode && isCurrentSelected
                    ? 'border-tag-text-red/30 bg-tag-bg-red/30'
                    : '',
                )}
              >
                <div className="flex flex-wrap">
                  {tags.map(({ label }) => (
                    <Tags key={label} className="mr-1" color="green" size="big">
                      {label}
                    </Tags>
                  ))}
                </div>

                <h6 className="h6">{title}</h6>

                <div className="text-icon-default c2 flex items-center justify-between">
                  <div className="flex gap-2">
                    <time className="">생성일: {createdAt}</time>
                    <Dot size={15} />
                    <p>질문 {questionCnt}개</p>
                  </div>
                </div>
              </article>
            </Link>
          );
        },
      )}
    </>
  );
};

export default AiRoomCard;
