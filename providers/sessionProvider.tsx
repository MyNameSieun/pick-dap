import { useEffect } from 'react';
import { useIsSessionLoaded, useSetSession } from '@/store/session';
import { GlobalLoader } from '@/components/ui/GlobalLoader';
import { createClient } from '@/lib/supabase/client';

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    const supabase = createClient();

    // 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 세션 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  // 세션 로딩이 끝나지 않았다면 로더를 표시하고, 하위 컴포넌트 렌더링을 막음
  if (!isSessionLoaded) return <GlobalLoader />;

  return <>{children}</>;
};
