'use client';

import { useEffect } from 'react';
import { useIsSessionLoaded, useSetSession } from '@/store/session';
import { createClient } from '@/lib/supabase/client';
import { GlobalLoader } from '@/components/ui/GlobalLoader';

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setSession = useSetSession();
  const supabase = createClient();
  const isSessionLoaded = useIsSessionLoaded();

  // 초기 세션 가져오기
  useEffect(() => {
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
  }, [setSession, supabase]);

  if (!isSessionLoaded) return <GlobalLoader />;

  return <>{children}</>;
};
