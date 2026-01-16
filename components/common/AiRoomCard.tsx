import Tags from '@/components/common/Tags/Tags';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import aiRoomsData from '@/data/aiRoomsData.json';
import { SetStateAction } from 'react';
import Line from './Line';

interface AiRoomCardProps {
  isEditMode: boolean;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<SetStateAction<number[]>>;
}

const AiRoomCard = ({
  isEditMode,
  selectedIds,
  setSelectedIds,
}: AiRoomCardProps) => {
  const toggleSelect = (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    // TODO: 클릭한 id가 selectedIds 배열에 이미 있으면? =>  필터링
    // TODO: 없으면? => 추가
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };
  return (
    <>
      {aiRoomsData.map(
        ({ id, title, createdAt, questionCnt, tags, roomId }) => {
          const isCurrentSelected = selectedIds.includes(id);

          return (
            <Link
              key={id}
              href={isEditMode ? '#' : `/interview/rooms/${roomId}`}
              onClick={(e) => isEditMode && toggleSelect(e, id)}
            >
              <article className="card-col-no-border">
                <div className="flex justify-between">
                  <div className="flex flex-wrap">
                    {tags.map(({ label }) => (
                      <Tags
                        key={label}
                        className="mr-1"
                        color="green"
                        size="big"
                      >
                        {label}
                      </Tags>
                    ))}
                  </div>
                  {isEditMode && (
                    <div
                      className={`h-5 w-5 rounded-full border ${isCurrentSelected ? 'bg-main-500 border-main-500' : 'border-gray-300'}`}
                    />
                  )}
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
              <Line />
            </Link>
          );
        },
      )}
    </>
  );
};

export default AiRoomCard;
