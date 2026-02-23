'use server';
import { generateSlug } from '@/lib/slugify';
import { createClient } from '@/lib/supabase/server';
import { CategoryTypeEnums } from '@/types/entity';
import { redirect } from 'next/navigation';

interface createQuestionProps {
  title: string;
  category: CategoryTypeEnums;
  tagList: string[];
  techStackIds: string[];
  currentPath: string;
}

export const createQuestion = async ({
  title,
  category,
  tagList,
  techStackIds,
  currentPath,
}: createQuestionProps) => {
  const supabase = await createClient();

  const slug = generateSlug(title); // Slug 생성

  /**
   *  1. 부모 pk 확보
   *  질문 작성자는 FK(user_id)로 연결됨
   */
  // 현재 로그인 사용자 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // 인증 실패 시 로그인 페이지로 이동, 원래 페이지 정보 포함
  if (authError || !user) {
    redirect(`/login?returnTo=${encodeURIComponent(currentPath)}`);
  }

  /**
   * 2. 메인 레코드(question)에 필요한 데이터 insert
   */
  const { data: question, error: qError } = await supabase
    .from('questions')
    .insert({
      user_id: user.id, // PK
      title: title,
      slug: slug,
    })
    .select() // 생성된 row 반환
    .single(); // 단일 객체로 받기

  if (qError) throw new Error();

  /**
   * 3. 다대다(N:M) 관계 처리(1):
   * - 참조 테이블: tags
   * - 중간 매핑 테이블: question_tags
   */

  // (1) 참조 테이블(tags) 존재 확인
  if (tagList?.length) {
    // 태그 insert용 데이터 변환
    const tagsToInsert = tagList.map((tag) => ({
      label: tag,
      tag_type: '카테고리' as const,
    }));

    // (2) 참조 테이블(tags)의 PK 확보
    const { data: tags, error: tError } = await supabase
      .from('tags')
      .upsert(tagsToInsert, { onConflict: 'label' }) // upsert로 중복 태그 방지 (label 기준)
      .select('id'); // 매핑에 사용할 id 확보, select()만 썼을 때 모든 컬럼(*) 반환

    if (tError) throw new Error();

    // (3) 중간 테이블(question_tags)에 FK 쌍을 insert
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

  /**
   * 3. 다대다(N:M) 관계 처리(2):
   * - 참조 테이블: tech_stack
   * - 중간 매핑 테이블: question_tech_stack
   */

  // (1) 참조 테이블(tech_stack) 존재 확인
  if (techStackIds?.length) {
    // (2) 중간 테이블(question_tech_stack)에 FK 쌍을 insert
    const mappingData = techStackIds.map((techId) => ({
      question_id: question.id,
      tech_stack_id: techId,
    }));

    const { error: tError } = await supabase

      .from('question_tech_stack')
      .insert(mappingData);

    if (tError) throw new Error(`기술 스택 매핑 실패: ${tError.message}`);
  }

  /**
   * 4. (1:1) 관계 처리(1):
   * - question_category 테이블
   */

  const { error: cError } = await supabase.from('question_category').insert({
    question_id: question.id,
    category_type: category,
  });
  if (cError) throw new Error();

  /**
   * 4. (1:1) 관계 처리(2):
   * - question_stats 테이블
   */

  const { error: statsError } = await supabase.from('question_stats').insert({
    question_id: question.id,
  });
  if (statsError) {
    console.error('통계 데이터를 불러올 수 없습니다:', statsError.message);
  }

  const { error: qsError } = await supabase.from('question_status').insert({
    question_id: question.id,
    status: 'pending',
  });
  if (qsError) throw new Error();

  return question;
};
