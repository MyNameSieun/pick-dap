'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import PaginationCustom from '@/components/common/PaginationCustom';
import Tabs from '@/components/common/Tabs/Tabs';
import CommunityCard from '@/features/mypage/components/CommunityCard';
import { Users } from 'lucide-react';

const TabItem = [
  {
    id: '1',
    label: '작성 게시글',
    content: (
      <div className="container-col gap-2.5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <PaginationCustom />
      </div>
    ),
  },
  {
    id: '2',
    label: '작성 댓글',
    content: (
      <div className="container-col gap-2.5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <PaginationCustom />
      </div>
    ),
  },
  {
    id: '3',
    label: '좋아요',
    content: (
      <div className="container-col gap-2.5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <PaginationCustom />
      </div>
    ),
  },
];

const MypageCommunityPage = () => {
  return (
    <div>
      <HeaderTitleBox
        title="커뮤니티"
        content="등록한 게시글과 좋아요한 게시글을 관리하세요"
        icon={Users}
      />

      <Tabs tabs={TabItem} />
    </div>
  );
};

export default MypageCommunityPage;
