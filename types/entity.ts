import type { Database } from '@/database.types';

/**
 * ======================
 * Posts
 * ======================
 */

export type PostEntity = Database['public']['Tables']['Posts']['Row'];

export type PostInsertEntity = Database['public']['Tables']['Posts']['Insert'];

export type PostUpdateEntity = Database['public']['Tables']['Posts']['Update'];

/**
 * ======================
 * Post Stats
 * ======================
 */

export type PostStatsEntity = Database['public']['Tables']['Post_stats']['Row'];

export type PostStatsInsertEntity =
  Database['public']['Tables']['Post_stats']['Insert'];

export type PostStatsUpdateEntity =
  Database['public']['Tables']['Post_stats']['Update'];

/**
 * ======================
 * Users (Profile)
 * ======================
 */

export type UserEntity = Database['public']['Tables']['Users']['Row'];

export type UserInsertEntity = Database['public']['Tables']['Users']['Insert'];

export type UserUpdateEntity = Database['public']['Tables']['Users']['Update'];
