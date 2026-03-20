import CommunityMain from '@/features/mypage/components/CommunityMain';

export const generateMetadata = async () => {
  return {
    title: '커뮤니티',
    default: '커뮤니티',
  };
};

const MypageCommunityPage = () => {
  return <CommunityMain />;
};

export default MypageCommunityPage;
