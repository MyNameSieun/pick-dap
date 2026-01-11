'use client';
import { MYPAGE_MENUS_ITEMS } from '@/constants/menu';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideMenuBarProps {
  isHeader: boolean;
}

const SideMenuBar = ({ isHeader }: SideMenuBarProps) => {
  const pathname = usePathname();

  return (
    <nav className="b1 ab flex cursor-pointer flex-col gap-2 py-4">
      {MYPAGE_MENUS_ITEMS.map((menu) => {
        const isActive = !isHeader && pathname === menu.link;
        return (
          <Link href={menu.link} key={menu.link}>
            <div
              className={clsx(
                'flex h-10 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100',
                {
                  'text-main-400 border border-gray-200': isActive,
                },
              )}
            >
              <menu.icon
                width={20}
                height={20}
                className={clsx('text-icon-default transition-colors', {
                  'text-main-400': isActive,
                })}
              />

              <p
                className={clsx('b2 text-gray-800', {
                  'text-main-400 font-bold': isActive,
                })}
              >
                {menu.name}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
export default SideMenuBar;
