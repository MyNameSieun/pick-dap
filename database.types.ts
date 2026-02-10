export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          created_at: string
          id: string
          like_count: number
          question_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          like_count?: number
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          like_count?: number
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          answer_id: string
          content: string
          created_at: string
          id: string
          post_id: string
          target_type: Database["public"]["Enums"]["target_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          answer_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          target_type: Database["public"]["Enums"]["target_type"]
          updated_at?: string
          user_id?: string
        }
        Update: {
          answer_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          target_type?: Database["public"]["Enums"]["target_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_stats: {
        Row: {
          bookmark_count: number
          comment_count: number
          id: string
          like_count: number
          view_count: number
        }
        Insert: {
          bookmark_count?: number
          comment_count?: number
          id?: string
          like_count?: number
          view_count?: number
        }
        Update: {
          bookmark_count?: number
          comment_count?: number
          id?: string
          like_count?: number
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_stats_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id?: string
          tag_id?: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          category_id: string
          content: string
          create_at: string
          id: string
          image_urls: string[] | null
          like_count: number
          slug: string
          title: string
          update_at: string
          user_id: string
        }
        Insert: {
          category_id?: string
          content: string
          create_at?: string
          id?: string
          image_urls?: string[] | null
          like_count?: number
          slug: string
          title: string
          update_at?: string
          user_id?: string
        }
        Update: {
          category_id?: string
          content?: string
          create_at?: string
          id?: string
          image_urls?: string[] | null
          like_count?: number
          slug?: string
          title?: string
          update_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          nickname: string
          role: Database["public"]["Enums"]["user_role"]
          social_provider: Database["public"]["Enums"]["social_provider"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          nickname: string
          role?: Database["public"]["Enums"]["user_role"]
          social_provider?: Database["public"]["Enums"]["social_provider"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          nickname?: string
          role?: Database["public"]["Enums"]["user_role"]
          social_provider?: Database["public"]["Enums"]["social_provider"]
          updated_at?: string
        }
        Relationships: []
      }
      question_category: {
        Row: {
          category_type: Database["public"]["Enums"]["category_type_enum"]
          question_id: string
        }
        Insert: {
          category_type: Database["public"]["Enums"]["category_type_enum"]
          question_id?: string
        }
        Update: {
          category_type?: Database["public"]["Enums"]["category_type_enum"]
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_category_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: true
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_stats: {
        Row: {
          bookmark_count: number
          comment_count: number
          question_id: string
          view_count: number
        }
        Insert: {
          bookmark_count?: number
          comment_count?: number
          question_id?: string
          view_count?: number
        }
        Update: {
          bookmark_count?: number
          comment_count?: number
          question_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_stats_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: true
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_tags: {
        Row: {
          question_id: string
          tag_id: string
        }
        Insert: {
          question_id?: string
          tag_id?: string
        }
        Update: {
          question_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_tags_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          id: string
          idx: number
          question_type: Database["public"]["Enums"]["question_type"]
          slug: string
          status: Database["public"]["Enums"]["status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          idx?: number
          question_type?: Database["public"]["Enums"]["question_type"]
          slug: string
          status?: Database["public"]["Enums"]["status"]
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          idx?: number
          question_type?: Database["public"]["Enums"]["question_type"]
          slug?: string
          status?: Database["public"]["Enums"]["status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          label: string
          tag_type: Database["public"]["Enums"]["tag_type"]
        }
        Insert: {
          id?: string
          label: string
          tag_type: Database["public"]["Enums"]["tag_type"]
        }
        Update: {
          id?: string
          label?: string
          tag_type?: Database["public"]["Enums"]["tag_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_question_full: {
        Args: {
          q_category_type: string
          q_id: string
          q_slug: string
          q_tags: string[]
          q_title: string
        }
        Returns: undefined
      }
    }
    Enums: {
      category_type:
        | "전체"
        | "FrontEnd"
        | "BackEnd"
        | "CS"
        | "인성면접"
        | "Infra"
        | "AI"
        | "Android"
        | "iOS"
      category_type_enum:
        | "FrontEnd"
        | "BackEnd"
        | "CS"
        | "인성면접"
        | "Infra"
        | "AI"
        | "Android"
        | "iOS"
      question_type: "pickdap" | "user"
      social_provider: "email" | "google" | "github" | "kakao"
      status: "미답변" | "답변 완료"
      tag_type: "카테고리" | "기술스택" | "상태" | "면접결과" | "인기"
      target_type: "POST" | "ANSWER"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      category_type: [
        "전체",
        "FrontEnd",
        "BackEnd",
        "CS",
        "인성면접",
        "Infra",
        "AI",
        "Android",
        "iOS",
      ],
      category_type_enum: [
        "FrontEnd",
        "BackEnd",
        "CS",
        "인성면접",
        "Infra",
        "AI",
        "Android",
        "iOS",
      ],
      question_type: ["pickdap", "user"],
      social_provider: ["email", "google", "github", "kakao"],
      status: ["미답변", "답변 완료"],
      tag_type: ["카테고리", "기술스택", "상태", "면접결과", "인기"],
      target_type: ["POST", "ANSWER"],
      user_role: ["user", "admin"],
    },
  },
} as const
