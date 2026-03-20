import MypageProjectsMain from '@/features/mypage/MypageProjectsMain';

export const generateMetadata = async () => {
  return {
    title: '프로젝트',
    default: '프로젝트',
  };
};

const MypageProjectsPage = () => {
  return <MypageProjectsMain />;
};

export default MypageProjectsPage;
