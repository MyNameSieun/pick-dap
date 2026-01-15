import MypageUserMenu from '@/features/mypage/components/MypageUserMenu';

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
