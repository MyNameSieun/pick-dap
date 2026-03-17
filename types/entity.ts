import type { Tables, TablesInsert, Enums } from '@/database.types';

// ==========================================
// 조회용 (Entity)
// ==========================================
export type PostEntity = Tables<'post'>;
export type PostCategoryEntity = Tables<'post_category'>;

export type ProfileEntity = Tables<'profiles'>;
export type AnswerEntity = Tables<'answers'>;
export type CommentEntity = Tables<'comments'>;
export type TagEntity = Tables<'tags'>;
export type QuestionEntity = Tables<'questions'>;
export type TechStack = Tables<'tech_stack'>;

export type InterviewReviewEntity = Tables<'interview_review'>;
export type JobRoleEntity = Tables<'job_role'>;
export type InterviewQuestionEntity = Tables<'interview_question'>;

export type PostStatsEntity = Tables<'post_stats'>;
export type PostTagEntity = Tables<'post_tags'>;
export type QuestionStatsEntity = Tables<'question_stats'>;
export type QuestionTagEntity = Tables<'question_tags'>;
export type QuestionCategoryEntity = Tables<'question_category'>;
export type QuestionStatusEntity = Tables<'question_status'>;

export type InterviewProcessEntity = Tables<'interview_processes'>;
export type ReviewQuestionTypeEntity = Tables<'review_question_type'>;

export type ProjectEntity = Tables<'project'>;
export type ProjectRetrospectiveEntity = Tables<'project_retrospective'>;
export type ProjectTroubleshootingEntity = Tables<'project_troubleshooting'>;
export type ProjectPerformancEntity = Tables<'project_performance'>;
export type ProjectRoleEntity = Tables<'project_role'>;
export type ProjectFunctionEntity = Tables<'project_function'>;
export type ProjectTechStackEntity = Tables<'project_tech_stack'>;

export type AiInterviewEntity = Tables<'ai_interview'>;
export type AiMessageEntity = Tables<'ai_message'>;

// ==========================================
// 중간 테이블
// ==========================================
export type QuestionInsert = TablesInsert<'questions'>;
export type TagInsert = TablesInsert<'tags'>;
export type QuestionTagInsert = TablesInsert<'question_tags'>;
export type QuestionTechStackInsert = TablesInsert<'question_tech_stack'>;
export type QuestionCategoryInsert = TablesInsert<'question_category'>;
export type QuestionStatusInsert = TablesInsert<'question_status'>;

export type ReviewProcessMapInsert = TablesInsert<'review_process_map'>;
export type ReviewQuestionTypeMapInsert =
  TablesInsert<'review_question_type_map'>;

// ==========================================
// 공통 타입 (Enums)
// ==========================================
export type TagType = Enums<'tag_type'>;
export type QuestionType = Enums<'question_type'>;
export type CategoryTypeEnums = Enums<'category_type_enum'>;
export type SocialProvider = Enums<'social_provider'>;
export type UserRole = Enums<'user_role'>;
export type StatusEnums = Enums<'status'>;
export type InterviewSeasonType = Enums<'interview_season_type'>;
export type EmploymentType = Enums<'employment_type'>;
export type DifficultyType = Enums<'difficulty_type'>;
export type InterviewPersonnelType = Enums<'interview_personnel_type'>;
export type ResultWaitTimeType = Enums<'result_wait_time_type'>;
export type FinalStatusType = Enums<'final_status_type'>;
export type ProjectType = Enums<'project_type_enum'>;
export type ChatRole = Enums<'chat_role'>;
