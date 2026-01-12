import AiRoomCard from '@/components/common/AiRoomCard';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';

const InterviewRoomsList = () => {
  return (
    <>
      <article>
        <SelectCountBox state="delete" count={2} />
      </article>
      <article className="flex flex-col gap-3">
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
      </article>
    </>
  );
};

export default InterviewRoomsList;
