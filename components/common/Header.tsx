'use client';

import { Button } from '@/components/ui/button/Button';
import SideMenuBar from '@/features/mypage/components/SideMenuBar';
import { Bell, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Line from './Line';
import profileImage from '@/public/profile.jpg';

const NAV_LIST = [
  {
    name: '면접 질문',
    link: '/question',
  },
  {
    name: '면접 연습',
    link: '/interview',
  },

  {
    name: '면접 후기',
    link: '/review',
  },

  {
    name: '커뮤니티',
    link: '/community',
  },
] as const;

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogin, setLogin] = useState(false);
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      className="w-full border-b border-gray-200 bg-white"
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative mx-auto max-w-7xl">
        <header className="b2 flex h-17.5 items-center px-10">
          <div className="relative aspect-[3/2] h-full">
            <Link href="/">
              <Image
                src="/logo/logo.png"
                fill
                className="object-fill"
                alt="로고"
              />
            </Link>
          </div>

          <div className="flex-1"></div>
          <div className="text-gray-1000 flex items-center justify-center gap-10">
            {NAV_LIST.map((nav) => (
              <Link
                key={nav.name}
                className={`${pathname.startsWith(nav.link) ? 'text-gray-1000 font-bold' : 'font-normal text-gray-800'}`}
                href={nav.link}
              >
                {nav.name}
              </Link>
            ))}
          </div>
          <div className="flex-1"></div>

          <div className="flex w-1/6 min-w-40 flex-none justify-center">
            {isLogin ? (
              <div className="flex items-center gap-8">
                <Bell className="text-icon-default hover:text-gray-1000 cursor-pointer" />

                <div className="relative">
                  <div
                    onClick={() => setVisible(!isVisible)}
                    className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-full"
                  >
                    <Image
                      className="object-cover"
                      src={profileImage}
                      fill
                      alt="프로필"
                      priority
                    />
                  </div>

                  {isVisible && (
                    <article className="absolute top-20 right-0 z-50 w-55 rounded-xl border border-gray-300 bg-white p-5 shadow-md">
                      <div className="ditems-center flex h-8 justify-between">
                        <p className="b1 font-bold text-gray-800">
                          <Link href={'/mypage'}>마이페이지</Link>
                        </p>

                        <Settings
                          className="text-icon-default hover:text-gray-1000 cursor-pointer"
                          height={20}
                          width={20}
                        />
                      </div>

                      <Line my={1} />

                      <SideMenuBar isHeader={true} />
                      <div className="-mx-4 -mb-4">
                        <Button
                          onClick={() => {
                            setLogin(!isLogin);
                            setVisible(false);
                            router.push('/');
                          }}
                          className={twMerge(
                            'h-11 w-full bg-gray-100 font-medium text-gray-800',
                            'border-0',
                          )}
                          variant="none"
                          size="sm"
                        >
                          로그아웃
                        </Button>
                      </div>
                    </article>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  className="px-6 font-medium"
                  variant="white"
                  size="sm"
                  onClick={() => {
                    setLogin(!isLogin);
                    router.push('/login');
                  }}
                >
                  로그인
                </Button>
                <Button
                  className="px-6"
                  size="sm"
                  onClick={() => router.push('/signup')}
                >
                  회원가입
                </Button>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
