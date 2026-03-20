import MypageUserMenu from '@/features/mypage/components/MypageUserMenu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '마이페이지',
    template: '마이페이지 | %s',
  },
  description: 'AI 기반 맞춤형 면접 대비 솔루션, 픽답',
};
const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex gap-5">
      <aside>
        <MypageUserMenu />
      </aside>
      <section className="flex-1">{children}</section>
    </main>
  );
};

export default MyPageLayout;
