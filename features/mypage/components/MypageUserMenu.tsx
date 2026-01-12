'use client';

import Line from '@/components/common/Line';
import { Settings } from 'lucide-react';

import profileImage from '@/public/profile.jpg';
import Image from 'next/image';
import SideMenuBar from '@/features/mypage/components/SideMenuBar';

const MypageUserMenu = () => {
  return (
    <nav className="sticky top-5 flex gap-4">
      <section className="w-[238] rounded-md border border-gray-300 bg-white p-6 shadow-md">
        <article className="flex flex-col items-center gap-5">
          <div className="relative h-30 w-30 overflow-hidden rounded-full">
            <Image
              onDragStart={(e) => e.preventDefault()}
              className="object-cover"
              alt="작성자 프로필"
              src={profileImage}
              fill
              priority
            />
          </div>
          <div className="flex gap-3">
            <h6 className="text-gray-800">사용자2</h6>
            <Settings className="text-icon-default" />
          </div>
        </article>
        <Line />
        <h6>마이페이지</h6>

        <article>
          <SideMenuBar isHeader={false} />
        </article>

        <Line />
      </section>
    </nav>
  );
};

export default MypageUserMenu;
