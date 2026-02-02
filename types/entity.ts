import type { Database } from '@/database.types';

export type PostEntity = Database['public']['Tables']['posts']['Row'];
export type ProfilesEntity = Database['public']['Tables']['profiles']['Row'];
