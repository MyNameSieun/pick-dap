'use server';
import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { CategoryTypeEnums, QuestionType } from '@/types/entity';
import { redirect } from 'next/navigation';

interface createQuestionProps {
  title: string;
  category: CategoryTypeEnums;
  tagList: string[];
  techStackIds: string[];
  currentPath: string;
  question_type: QuestionType;
}

export const createQuestion = async ({
  title,
  category,
  tagList,
  techStackIds,
  currentPath,
  question_type = 'user',
}: createQuestionProps) => {
  const supabase = await createClient();
  const slug = generateSlug(title);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect(`/login?returnTo=${encodeURIComponent(currentPath)}`);
  }

  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      user_id: user.id,
      title: title,
      slug: slug,
      question_type,
    })
    .select()
    .single();

  if (qError) throw new Error('질문 생성 실패');

  const { error: bError } = await supabase.from('bookmark').insert({
    user_id: user.id,
    question_id: question.id,
  });

  const { error: statsError } = await supabase.from('question_stats').insert({
    question_id: question.id,
    bookmark_count: 1,
  });

  if (bError || statsError) {
    console.error('북마크/통계 생성 오류');
  }

  if (tagList?.length) {
    const tagsToInsert = tagList.map((tag) => ({
      label: tag,
      tag_type: '카테고리' as const,
    }));

    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' })
      .select('id');

    if (!tError && tags) {
      const mappingData = tags.map((t) => ({
        question_id: question.id,
        tag_id: t.id,
      }));
      await supabase.from('question_tags').insert(mappingData);
    }
  }

  if (techStackIds?.length) {
    const mappingData = techStackIds.map((techId) => ({
      question_id: question.id,
      tech_stack_id: techId,
    }));
    await supabase.from('question_tech_stack').insert(mappingData);
  }

  await supabase.from('question_category').insert({
    question_id: question.id,
    category_type: category,
  });

  await supabase.from('question_status').insert({
    question_id: question.id,
    status: 'pending',
  });

  return question;
};
