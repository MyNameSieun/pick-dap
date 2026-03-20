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

  if (authError || !user) {
    throw new Error('인증 정보를 불러오는데 실패했습니다.');
  }

  // 슬러그 중복 체크
  const baseSlug = generateSlug(title);

  const { data: existingPosts } = await supabase
    .from('post')
    .select('slug')
    .ilike('slug', `${baseSlug}%`);

  let finalSlug = baseSlug;

  if (existingPosts && existingPosts.length > 0) {
    const slugList = existingPosts.map((p) => p.slug);

    const numbers = slugList
      .map((s) => {
        if (s === baseSlug) return 0;
        const match = s.match(new RegExp(`^${baseSlug}-(\\d+)$`));
        return match ? parseInt(match[1], 10) : -1;
      })
      .filter((n) => n !== -1);

    if (numbers.length > 0) {
      const maxNum = Math.max(...numbers);
      finalSlug = `${baseSlug}-${maxNum + 1}`;
    }
  }

  const { data, error } = await supabase
    .from('post')
    .insert({
      user_id: user.id,
      category_id,
      title,
      content,
      image_urls,
      slug: finalSlug,
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
