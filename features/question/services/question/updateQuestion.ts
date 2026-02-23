'use server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/slugify';
import { CategoryTypeEnums, TagInsert } from '@/types/entity';

// 1. 수정에 필요한 타입 정의
export interface UpdateQuestionParams {
  id: string;
  title: string;
  category: {
    category_type: CategoryTypeEnums;
  };
  tagList: string[];
  techStackIds: string[];
}

export const updateQuestion = async (
  // 2. props로 수정에 필요한 데이터 받아오기
  question: Partial<UpdateQuestionParams> & { id: string | number },
) => {
  const supabase = await createClient();

  const questionId = String(question.id);

  // 3. 메인 테이블(question)은 update로 수정
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

  /**
   * 연관 테이블은 삭제 후 재생성
   */
  // 4. question_category: 삭제 후 재생성
  // 4.1 기존 관계 delete
  await supabase
    .from('question_category')
    .delete()
    .eq('question_id', questionId);

  // 4.2 새로운 관계 insert
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

  // 5. question_tags: 삭제 후 재생성
  // 5.1 기존 관계 delete
  await supabase.from('question_tags').delete().eq('question_id', questionId);

  const tagList = question.tagList ?? [];
  if (tagList.length > 0) {
    const tagsToInsert: TagInsert[] = tagList.map((label) => ({
      label,
      tag_type: '카테고리',
    }));

    // 5.2 새로운 관계 insert
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

  // 6. question_tech_stack 삭제 후 재생성
  // 6.1 기존 관계 delete
  await supabase
    .from('question_tech_stack')
    .delete()
    .eq('question_id', questionId);

  // 6.2 새로운 관계 insert
  const techStackIds = question.techStackIds ?? [];
  if (techStackIds.length > 0) {
    const techMappingData = techStackIds.map((techId: string) => ({
      question_id: questionId,
      tech_stack_id: techId,
    }));

    const { error: techError } = await supabase
      .from('question_tech_stack')
      .insert(techMappingData);

    if (techError) {
      console.error('Tech stack update failed:', techError.message);
      throw new Error('기술 스택 수정 중 오류가 발생했습니다.');
    }
  }

  // 7. 캐시 즉시 업데이트를 위한 코드 -> 쿼리 무효화 할 거면 필요 x
  const { data: fullData } = await supabase
    .from('questions')
    .select(
      `
      *,
      author:profiles(*),
      category:question_category(category_type),
      tags:question_tags(tag:tags(*)),
      tech_stacks:question_tech_stack(tech:tech_stack_id(*)),
      stats:question_stats(*) 
    `,
    )
    .eq('id', questionId)
    .single();

  return fullData;
};
