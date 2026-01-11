import AiRecodeSelected from '@/features/mypage/components/AiRecodeSelected';
import AiRoomCard from '@/features/mypage/components/AiRoomCard';

const MypageRoomsPage = () => {
  return (
    <div>
      <AiRecodeSelected />
      <div className="container-col gap-2.5">
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
        <AiRoomCard />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
