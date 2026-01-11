import { MYPAGE_MENUS_ITEMS } from '@/constants/menu';
import Link from 'next/link';

const SideMenuBar = () => {
  return (
    <nav className="b1 ab flex cursor-pointer flex-col gap-2 py-4">
      {MYPAGE_MENUS_ITEMS.map((menu) => (
        <Link href={menu.link} key={menu.link}>
          <div className="flex h-10 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
            <menu.icon
              className="text-icon-default text"
              width={20}
              height={20}
            />
            <p className="b2 text-gray-800">{menu.name}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
};
export default SideMenuBar;
