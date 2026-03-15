'use server';

import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';

interface createPostProps {
  title: string;
  content: string;
  image_urls: string[];
  category_id: string;
}

export const createPost = async ({
  title,
  content,
  image_urls,
  category_id,
}: createPostProps) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user)
    throw new Error('인증 정보를 불러오는데 실패했습니다.');

  // 메인 레코드
  const { data, error } = await supabase
    .from('post')
    .insert({
      user_id: user.id,
      category_id,
      title,
      content,
      image_urls,
      slug: generateSlug(title),
    })
    .select(
      `
      *,
      post_category (slug)
    `,
    )
    .single();

  if (error) {
    console.error(error);
    throw new Error(`글 작성 실패: ${error.message}`);
  }

  return data;
};
