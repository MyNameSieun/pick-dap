// features/question/services/createQuestion.ts
'use server';
import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { CategoryTypeEnums, TagInsert } from '@/types/entity';

interface createQuestionProps {
  title: string;
  category: CategoryTypeEnums;
  tagList: string[];
}

export const createQuestion = async ({
  title,
  category,
  tagList,
}: createQuestionProps) => {
  // 1. 서버 환경에서 Supabase 클라이언트 생성
  const supabase = await createClient();

  // 2. Slug 생성
  const slug = generateSlug(title);

  // 3. 현재 로그인 사용자 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  // 4. questions 테이블에 부모 데이터 먼저 insert
  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      user_id: user.id,
      title: title,
      slug: slug,
    })
    .select() // 생성된 row 반환
    .single(); // 단일 객체로 받기

  if (qError) throw new Error();

  // 5. 생성된 question.id로 카테고리 연결
  const { error: cError } = await supabase.from('question_category').insert({
    question_id: question.id,
    category_type: category,
  });
  if (cError) throw new Error();

  //  6. 태그가 존재하면 처리
  if (tagList.length > 0) {
    // 태그 insert용 데이터 변환
    const tagsToInsert: TagInsert[] = tagList.map((tag) => ({
      label: tag,
      tag_type: '카테고리',
    }));

    // upsert로 중복 태그 방지 (label 기준)
    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' }) // 중복이면 기존 태그 사용
      .select(); // 매핑에 사용할 id 확보

    if (tError) throw new Error();

    if (tags) {
      // question ↔ tag N:M 관계 매핑
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

  const { error: statsError } = await supabase.from('question_stats').insert({
    question_id: question.id,
    bookmark_count: 0,
    view_count: 0,
    comment_count: 0,
  });

  if (statsError) {
    console.error('통계 데이터를 불러올 수 없습니다:', statsError.message);
  }
  return question;
};
