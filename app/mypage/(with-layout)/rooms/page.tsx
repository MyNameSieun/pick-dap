'use client';
import AiRoomCard from '@/components/common/AiRoomCard';
import { FolderOpen } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';

const MypageRoomsPage = () => {
  return (
    <div>
      <HeaderTitleBox
        title="픽봇 AI 면접"
        icon={FolderOpen}
        content="AI 면접관과의 대화 기록을 확인하고 복습하세요"
        buttonOption={{
          text: '기록 선택',
        }}
      />

      <div className="container-col gap-2.5">
        <AiRoomCard />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
