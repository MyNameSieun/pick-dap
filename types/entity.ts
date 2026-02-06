import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from '@/database.types';

export type PostEntity = Tables<'posts'>;
export type ProfileEntity = Tables<'profiles'>;
export type AnswerEntity = Tables<'answers'>;
export type CommentEntity = Tables<'comments'>;
export type TagEntity = Tables<'tags'>;
export type QuestionEntity = Tables<'questions'>;

export type PostStatsEntity = Tables<'post_stats'>;
export type PostTagEntity = Tables<'post_tags'>;
export type QuestionStatsEntity = Tables<'question_stats'>;
export type QuestionTagEntity = Tables<'question_tags'>;
export type QuestionCategoryEntity = Tables<'question_category'>;

export type PostInsert = TablesInsert<'posts'>;
export type PostUpdate = TablesUpdate<'posts'>;
export type CommentInsert = TablesInsert<'comments'>;
export type AnswerInsert = TablesInsert<'answers'>;

export type QuestionInsert = TablesInsert<'questions'>;
export type TagInsert = TablesInsert<'tags'>;
export type QuestionTagInsert = TablesInsert<'question_tags'>;
export type QuestionCategoryInsert = TablesInsert<'question_category'>;

export type TargetType = Enums<'target_type'>;
export type TagType = Enums<'tag_type'>;
export type UserRole = Enums<'user_role'>;
export type QuestionStatus = Enums<'status'>;
export type SocialProvider = Enums<'social_provider'>;
export type CategoryType = Enums<'category_type'>;
export type QuestionType = Enums<'question_type'>;
