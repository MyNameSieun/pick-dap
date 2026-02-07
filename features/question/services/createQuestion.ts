'use server';
import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { CategoryType, TagInsert } from '@/types/entity';

interface createQuestionProps {
  title: string;
  category: CategoryType;
  tagList: string[];
}

export const createQuestion = async ({
  title,
  category,
  tagList,
}: createQuestionProps) => {
  const supabase = await createClient();

  // 1. Slug 생성
  const slug = generateSlug(title);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 2. 질문 테이블에 삽입
  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      user_id: user.id,
      title: title,
      slug: slug,
    })
    .select()
    .single();

  if (qError) throw new Error();

  // 3. question_category 데이터 채우기
  const { error: cError } = await supabase.from('question_category').insert({
    question_id: question.id,
    category_type: category,
  });
  if (cError) throw new Error();

  // 4. tag가 있다면, tags 테이블 채우기
  if (tagList.length > 0) {
    const tagsToInsert: TagInsert[] = tagList.map((tag) => ({
      label: tag,
      tag_type: '카테고리',
    }));

    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' })
      .select();

    if (tError) throw new Error();

    if (tags) {
      const mappingData = tags.map((t) => ({
        question_id: question.id,
        tag_id: t.id,
      }));

      const { error: qError } = await supabase
        .from('question_tags')
        .insert(mappingData);

      if (qError) throw new Error();
    }
  }

  return question;
};
