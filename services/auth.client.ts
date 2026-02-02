import { createClient } from '@/lib/supabase/client';

export const signInWithOAuth = async (
  provider: 'google' | 'github' | 'kakao',
) => {
  const supabase = createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};
