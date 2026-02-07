import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '면접 연습',
    template: '면접연습 | %s',
  },
  description: 'AI 기반 맞춤형 면접 대비 솔루션, 픽답',
};

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
