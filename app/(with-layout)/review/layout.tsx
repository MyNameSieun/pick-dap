import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    default: '면접 후기',
    template: '면접후기 | %s',
  },
  description: 'AI 기반 맞춤형 면접 대비 솔루션, 픽답',
};
export const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default ReviewLayout;
