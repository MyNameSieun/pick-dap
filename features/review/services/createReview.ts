'use server';
import { createClient } from '@/lib/supabase/server';
import {
  DifficultyType,
  EmploymentType,
  FinalStatusType,
  InterviewPersonnelType,
  InterviewSeasonType,
  ResultWaitTimeType,
} from '@/types/entity';

export interface CreateReviewParams {
  job_role_id: string;
  company_name: string;

  interview_year: number;
  interview_season: InterviewSeasonType;

  employment_type: EmploymentType;
  atmosphere_score: number;
  difficulty:  DifficultyType;
  interview_personnel_type: InterviewPersonnelType;
  overall_review: string;
  interview_tip?: string;
  result_wait_time_type: ResultWaitTimeType;
  final_status_type: FinalStatusType;
  proof_url: string;

  // 관계형 데이터 (배열)
  questions: {
    id?: string;
    review_content: string;
  }[];
  processIds: string[];
  questionTypeIds: string[];
}

export const createReview = async (props: CreateReviewParams) => {
  const supabase = await createClient();

  // 사용자 조회
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error('인증되지 않은 사용자입니다.');

  const { questions, processIds, questionTypeIds, ...reviewFields } = props; // 메인 레코드

  const { data: review, error: rError } = await supabase
    .from('interview_review')
    .insert({
      ...reviewFields,
      user_id: user.id,
    })
    .select()
    .single();

  if (rError) {
    console.error('review 생성 실패:', rError);
    throw new Error(rError.message);
  }

  // 일대다
  if (questions && questions.length > 0) {
    const questionToInsert = questions.map((q) => ({
      review_id: review.id,
      review_content: q.review_content,
    }));

    const { error: iError } = await supabase
      .from('interview_question')
      .insert(questionToInsert);

    if (iError) throw new Error('질문 저장 실패');
  }

  // 다대다
  if (processIds && processIds.length > 0) {
    const processMaps = processIds.map((id) => ({
      review_id: review.id,
      processes_id: id,
    }));
    const { error } = await supabase
      .from('review_process_map')
      .insert(processMaps);

    if (error) throw new Error('전형 단계 저장 실패');
  }

  if (questionTypeIds && questionTypeIds.length > 0) {
    const questionTypeMaps = questionTypeIds.map((id) => ({
      review_id: review.id,
      question_type_id: id,
    }));
    const { error } = await supabase
      .from('review_question_type_map')
      .insert(questionTypeMaps);

    if (error) throw new Error('질문 타입 단계 저장 실패');
  }
};

export default createReview;
