import MypageUserMenu from '@/features/mypage/components/MypageUserMenu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보와 활동을 관리합니다.',
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
