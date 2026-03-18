'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import Tabs from '@/components/common/Tabs/Tabs';
import MypageCommunityList from '@/features/mypage/components/MypageCommunityList';
import { useSession } from '@/store/session';
import { Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const MypageCommunityPage = () => {
  const user = useSession()?.user;
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'posts';

  const handleTabChange = (tabValue: string) => {
    router.push(`/mypage/community?tab=${tabValue}`);
  };

  if (!user) return null;

  const TabItem = [
    {
      id: 'posts',
      label: '작성 게시글',
      content: <MypageCommunityList type="posts" userId={user?.id} />,
    },
    {
      id: 'comments',
      label: '작성 댓글',
      content: <MypageCommunityList type="comments" userId={user?.id} />,
    },
    {
      id: 'liked',
      label: '좋아요',
      content: <MypageCommunityList type="liked" userId={user?.id} />,
    },
  ];
  return (
    <div>
      <HeaderTitleBox
        title="커뮤니티"
        content="등록한 게시글과 좋아요한 게시글을 관리하세요"
        icon={Users}
      />
      <Tabs
        tabs={TabItem}
        setId={currentTab}
        onTabChange={handleTabChange}
        type="mypage"
      />
    </div>
  );
};

export default MypageCommunityPage;
