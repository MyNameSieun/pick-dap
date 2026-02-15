'use server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/slugify';
import { CategoryType, TagInsert } from '@/types/entity';
import { QuestionWithDetails } from './fetchQuestion';

export interface UpdateQuestionParams {
  id: string;
  title: string;
  category: {
    category_type: CategoryType;
  };
  tagList: string[];
}

export const updateQuestion = async (
  question: Partial<UpdateQuestionParams> & { id: string | number },
) => {
  const supabase = await createClient();

  const questionId = String(question.id);

  // 1. questions 테이블만 수정 (실제 컬럼만)
  const { error: qError } = await supabase
    .from('questions')
    .update({
      title: question.title,
      slug: generateSlug(question.title ?? ''),
      updated_at: new Date().toISOString(),
    })
    .eq('id', questionId)
    .select()
    .single();

  if (qError) {
    console.error('Update failed:', qError.message);
    throw new Error(qError.message ?? '질문 수정 중 오류가 발생했습니다.');
  }

  // 2. question_category: 삭제 후 재생성
  await supabase
    .from('question_category')
    .delete()
    .eq('question_id', questionId);

  if (question.category?.category_type) {
    const { error: cError } = await supabase.from('question_category').insert({
      question_id: questionId,
      category_type: question.category.category_type,
    });
    if (cError) {
      console.error('Category update failed:', cError.message);
      throw new Error(
        cError.message ?? '카테고리 수정 중 오류가 발생했습니다.',
      );
    }
  }

  // 3. question_tags: 삭제 후 재생성
  await supabase.from('question_tags').delete().eq('question_id', questionId);

  const tagList = question.tagList ?? [];
  if (tagList.length > 0) {
    const tagsToInsert: TagInsert[] = tagList.map((label) => ({
      label,
      tag_type: '카테고리',
    }));

    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' })
      .select();

    if (tError) {
      console.error('Tags upsert failed:', tError.message);
      throw new Error(tError.message ?? '태그 수정 중 오류가 발생했습니다.');
    }

    if (tags?.length) {
      const mappingData = tags.map((t) => ({
        question_id: questionId,
        tag_id: t.id,
      }));

      const { error: qtError } = await supabase
        .from('question_tags')
        .insert(mappingData);

      if (qtError) {
        console.error('Question tags insert failed:', qtError.message);
        throw new Error(
          qtError.message ?? '질문-태그 연결 중 오류가 발생했습니다.',
        );
      }
    }
  }

  // 4. 캐시 즉시 업데이트를 위한 코드 -> 쿼리 무효화 할 거면 필요 x
  const { data: fullData } = await supabase
    .from('questions')
    .select(
      `
        *,
        author:profiles(*),
        category:question_category(category_type),
        tags:question_tags(tag:tags(*)),
        stats:question_stats(*) 
     `,
    )
    .eq('id', questionId)
    .single();

  return fullData as QuestionWithDetails;
};
