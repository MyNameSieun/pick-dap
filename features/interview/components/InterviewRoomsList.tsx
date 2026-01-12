import AiRoomCard from '@/components/common/AiRoomCard';
import { SetStateAction } from 'react';

interface interviewRoomListProps {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
}

const InterviewRoomsList = ({
  isEditMode,
  setIsEditMode,
}: interviewRoomListProps) => {
  return (
    <>
      <article>
        <SelectCountBox state="delete" count={2} className="min-w-full" />
      </article>
      <article className="flex flex-col gap-3">
        <AiRoomCard isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      </article>
    </>
  );
};

export default InterviewRoomsList;
