"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isLogin, setLogin] = useState(false);

  return (
    <>
      <header className="c1 bg-bg-default flex h-17.5 w-full items-center border-b-gray-300 px-10">
        <div className="relative aspect-[3/2] h-full">
          <Link href="/">
            <Image src="/logo.png" fill className="object-fill" alt="로고" />
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center justify-center gap-10">
          <Link
            className={`${pathname.startsWith("/question") ? "font-bold" : "font-normal"}`}
            href={`/question`}
          >
            면접 질문
          </Link>
          <Link
            className={`${pathname.startsWith("/interview") ? "font-bold" : "font-normal"}`}
            href={`/interview`}
          >
            면접 연습
          </Link>
          <Link
            className={`${pathname.startsWith("/review") ? "font-bold" : "font-normal"}`}
            href={`/review`}
          >
            면접 후기
          </Link>
          <Link
            className={`${pathname.startsWith("/community") ? "font-bold" : "font-normal"}`}
            href={`/community`}
          >
            커뮤니티
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center justify-end gap-8">
          <Bell className="cursor-pointer" onClick={() => setLogin(!isLogin)} />
          {isLogin ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                className="object-contain"
                src="/profile.jpg"
                fill
                alt="프로필"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
