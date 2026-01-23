import { createClient } from '@/lib/supabase/client';

export const signUp = async ({
  email,
  password,
  username
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password,  options: { data: { user_name:username } }  });

  if (error) {
    console.log(error.message);
    throw error;
  }

  
  return data;
};