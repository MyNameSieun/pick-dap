'use client';
import CommunityCard from '@/features/mypage/components/CommunityCard';
import ListSelectionHeader from '@/features/mypage/components/ListSelectionHeader';
import { Users } from 'lucide-react';

const MypageCommunityPage = () => {
  const handleAddCard = () => {
    alert('추가');
  };
  return (
    <div>
      <ListSelectionHeader
        title="커뮤니티"
        content="등록한 게시글과 좋아요한 게시글을 관리하세요"
        icon={Users}
        onAction={handleAddCard}
        selectedCount={3}
        actionButtonName="내 리스트에 추가"
      />
      <div className="container-col gap-2.5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
    </div>
  );
};

export default MypageCommunityPage;
