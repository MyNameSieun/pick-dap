"use client";

import { Button } from "@/components/ui/button/Button";
import SideMenuBar from "@/features/mypage/components/SideMenuBar";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogin, setLogin] = useState(false);
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <header className="b2 bg-bg-light flex h-17.5 items-center border-b border-b-gray-300 px-10">
          <div className="relative aspect-[3/2] h-full">
            <Link href="/">
              <Image src="/logo.png" fill className="object-fill" alt="로고" />
            </Link>
          </div>
          <div className="flex-1"></div>
          <div className="text-gray-1000 flex items-center justify-center gap-10">
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
          <div className="flex w-1/6 min-w-40 flex-none justify-center">
            {isLogin ? (
              <div className="flex items-center gap-8">
                <Bell className="text-icon-default cursor-pointer" />
                <div
                  onClick={() => setVisible(!isVisible)}
                  className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-full"
                >
                  <Image
                    className="object-contain"
                    src="/profile.jpg"
                    fill
                    alt="프로필"
                  />
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
                    router.push("/login");
                  }}
                >
                  로그인
                </Button>
                <Button
                  className="px-6"
                  size="sm"
                  onClick={() => router.push("/signup")}
                >
                  회원가입
                </Button>
              </div>
            )}
          </div>
        </header>
        {isVisible && (
          <div className="absolute top-21 right-10 z-50 h-fit w-fit rounded-xl border border-gray-300 bg-white p-4 shadow-md">
            <SideMenuBar />
            <div className="-mx-4 -mb-4">
              <Button
                onClick={() => {
                  setLogin(!isLogin);
                  setVisible(false);
                  router.push("/");
                }}
                className={twMerge(
                  "h-11 w-full bg-gray-100 font-medium text-gray-800",
                  "border-0",
                )}
                variant="none"
                size="sm"
              >
                로그아웃
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
