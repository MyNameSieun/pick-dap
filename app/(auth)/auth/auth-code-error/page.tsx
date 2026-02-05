import Link from 'next/link';
import AuthHeader from '@/features/auth/AuthHeader';
import { Button } from '@/components/ui/button';

const AuthCodeErrorPage = () => {
  return (
    <div className="mx-auto w-200">
      <AuthHeader />

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">인증 오류가 발생했습니다</h2>
          <p className="text-center text-gray-600">
            인증 코드 처리 중 문제가 발생했습니다.
            <br />
            다시 로그인을 시도해주세요.
          </p>
        </div>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/login">로그인 페이지로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthCodeErrorPage;