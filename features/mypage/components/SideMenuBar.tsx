import { Bookmark, Bot, FolderOpen, Settings, Users } from 'lucide-react';
import Link from 'next/link';

const menuList = [
  {
    link: '/mypage/question',
    name: '저장된 질문',
    icon: Bookmark,
  },
  {
    link: '/mypage/rooms',
    name: '픽봇 AI 면접',
    icon: Bot,
  },
  {
    link: '/mypage/community',
    name: '커뮤니티',
    icon: Users,
  },
  {
    link: '/mypage/projects',
    name: '프로젝트',
    icon: FolderOpen,
  },
];

const SideMenuBar = () => {
  return (
    <aside className="flex h-fit w-38.5 flex-col">
      <div className="ditems-center flex h-8 w-full justify-between border-b border-b-gray-300 pb-2">
        <p className="text-button-sm font-bold text-gray-800">
          <Link href={'/mypage'}>마이페이지</Link>
        </p>
        <Settings
          className="text-icon-default hover:text-gray-1000 cursor-pointer"
          height={20}
          width={20}
        />
      </div>

      <nav className="flex h-fit w-full cursor-pointer flex-col gap-2 py-4">
        {menuList.map((menu) => (
          <Link href={menu.link} key={menu.link}>
            <div className="flex h-7 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
              <menu.icon className="text-icon-default" width={20} height={20} />
              <p className="text-button-sm text-gray-800">{menu.name}</p>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default SideMenuBar;
