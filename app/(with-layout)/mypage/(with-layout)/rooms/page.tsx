import AiRoomsMain from '@/features/mypage/components/AiRoomsMain';

export const generateMetadata = async () => {
  return {
    title: '픽봇 AI 면접',
    default: '픽봇 AI 면접',
  };
};

const MypageRoomsPage = () => {
  return (
    <div>
      <AiRoomsMain />
    </div>
  );
};

export default MypageRoomsPage;
