'use client';
import ListSelectionHeader from '@/features/mypage/components/ListSelectionHeader';
import AiRoomCard from '@/components/common/AiRoomCard';
import { FolderOpen } from 'lucide-react';

const MypageRoomsPage = () => {
  const handleDeleteCard = () => {
    alert('삭제');
  };
  return (
    <div>
      <ListSelectionHeader
        title="픽봇 AI 면접"
        icon={FolderOpen}
        content="AI 면접관과의 대화 기록을 확인하고 복습하세요"
        onAction={handleDeleteCard}
        selectedCount={2}
        actionButtonName="선택한 항목 삭제"
      />
      <div className="container-col gap-2.5">
        <AiRoomCard />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
