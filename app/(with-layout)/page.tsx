import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: 'AI로 완성하는 면접 준비, 픽답',
};

const MainPage = () => {
  return <div className="mx-auto max-w-2xl min-w-2xs flex-col"></div>;
};

export default MainPage;
