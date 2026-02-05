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

export type PostInsert = TablesInsert<'posts'>;
export type PostUpdate = TablesUpdate<'posts'>;
export type CommentInsert = TablesInsert<'comments'>;
export type AnswerInsert = TablesInsert<'answers'>;

export type TargetType = Enums<'target_type'>;
export type TagType = Enums<'tag_type'>;
export type UserRole = Enums<'user_role'>;
export type QuestionStatus = Enums<'status'>;
export type SocialProvider = Enums<'social_provider'>;
