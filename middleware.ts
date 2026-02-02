// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

const protectedPaths = ["/mypage"]; // 로그인 필수 경로
const publicPaths = ["/login", "/signup", "/"]; // 공개 경로

export async function middleware(request: NextRequest) {
  // supabase 인스턴스와 response 둘 다 반환
  const { supabase, response } = createClient(request);

  const { pathname } = request.nextUrl; // 요청 경로

  // 공개 경로는 바로 통과
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return response;
  }

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (isProtectedPath) {
    const {
      data: { user },
    } = await supabase.auth.getUser(); // 사용자 정보 가져오기   (getSession 대신 getUser를 사용하는 것이 보안상 더 안전)

    if (!user) {
      // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl); // 로그인 페이지로 리다이렉트
    }
  }

  return response; // 반드시 갱신된 쿠키가 포함된 response를 반환해야 한다.
}

// 정적 파일 제외하고 모든 경로에 middleware 적용
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
