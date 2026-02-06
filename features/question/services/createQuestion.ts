// features/question/services/createQuestion.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { TagInsert, CategoryType } from '@/types/entity';

interface createQuestionProps {
  title: string;
  category: string;
  tagList?: string[];
}

export const createQuestion = async ({
  title,
  category,
  tagList,
}: createQuestionProps) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      title,
      user_id: user.id,
    })
    .select()
    .single();

  if (qError) throw qError;

  const { error: cError } = await supabase.from('question_category').insert({
    question_id: question.id,
    category_type: category as CategoryType,
  });

  if (cError) throw cError;

  if (tagList && tagList.length > 0) {
    const tagsToInsert: TagInsert[] = tagList.map((tag) => ({
      label: tag,
      tag_type: '카테고리',
    }));

    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' })
      .select();

    if (tError) throw tError;

    if (tags) {
      const mappingData = tags.map((t) => ({
        question_id: question.id,
        tag_id: t.id,
      }));

      const { error: mError } = await supabase
        .from('question_tags')
        .insert(mappingData);

      if (mError) throw mError;
    }
  }

  revalidatePath('/questions');

  return question;
};
