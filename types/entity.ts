import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from '@/database.types';

// 조회용 (필수사항)
export type PostEntity = Tables<'posts'>;
export type ProfileEntity = Tables<'profiles'>;
export type AnswerEntity = Tables<'answers'>;
export type CommentEntity = Tables<'comments'>;
export type TagEntity = Tables<'tags'>;
export type QuestionEntity = Tables<'questions'>;
export type TechStack = Tables<'tech_stack'>;

export type PostStatsEntity = Tables<'post_stats'>;
export type PostTagEntity = Tables<'post_tags'>;
export type QuestionStatsEntity = Tables<'question_stats'>;
export type QuestionTagEntity = Tables<'question_tags'>;
export type QuestionCategoryEntity = Tables<'question_category'>;
export type QuestionStatusEntity = Tables<'question_status'>;

// 생성용
export type PostInsert = TablesInsert<'posts'>;
export type CommentInsert = TablesInsert<'comments'>;
export type AnswerInsert = TablesInsert<'answers'>;

export type PostUpdate = TablesUpdate<'posts'>;
export type QuestionStatusInsert = TablesInsert<'question_status'>;

// 중간 테이블
export type QuestionInsert = TablesInsert<'questions'>;
export type TagInsert = TablesInsert<'tags'>;
export type QuestionTagInsert = TablesInsert<'question_tags'>;
export type QuestionTechStackInsert = TablesInsert<'question_tech_stack'>;
export type QuestionCategoryInsert = TablesInsert<'question_category'>;

export type TagType = Enums<'tag_type'>;
export type QuestionType = Enums<'question_type'>;
export type CategoryTypeEnums = Enums<'category_type_enum'>;

export type SocialProvider = Enums<'social_provider'>;
export type UserRole = Enums<'user_role'>;
export type StatusEnums = Enums<'status'>;
