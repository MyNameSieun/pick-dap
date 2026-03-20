import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '커뮤니티',
    template: '커뮤니티 | %s',
  },
  description: 'AI 기반 맞춤형 면접 대비 솔루션, 픽답',
};

export const CommunityLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export default CommunityLayout;
