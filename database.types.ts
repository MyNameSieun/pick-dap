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
          question_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmark: {
        Row: {
          created_at: string
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          answer_id: string | null
          content: string
          created_at: string
          depth: number
          group_id: string | null
          id: string
          parent_id: string | null
          post_id: string | null
          root_created_at: string
          root_user_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answer_id?: string | null
          content?: string
          created_at?: string
          depth?: number
          group_id?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          root_created_at?: string
          root_user_id: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          answer_id?: string | null
          content?: string
          created_at?: string
          depth?: number
          group_id?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          root_created_at?: string
          root_user_id?: string
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
            foreignKeyName: "comments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
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
      interview_processes: {
        Row: {
          display_order: number
          id: string
          name: string
        }
        Insert: {
          display_order?: number
          id?: string
          name: string
        }
        Update: {
          display_order?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      interview_question: {
        Row: {
          display_order: number
          id: string
          review_content: string
          review_id: string
        }
        Insert: {
          display_order?: number
          id?: string
          review_content: string
          review_id?: string
        }
        Update: {
          display_order?: number
          id?: string
          review_content?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Interview_question_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "interview_review"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_review: {
        Row: {
          atmosphere_score: number
          company_name: string
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty_type"]
          employment_type: Database["public"]["Enums"]["employment_type"]
          final_status_type: Database["public"]["Enums"]["final_status_type"]
          id: string
          interview_personnel_type: Database["public"]["Enums"]["interview_personnel_type"]
          interview_season: Database["public"]["Enums"]["interview_season_type"]
          interview_tip: string | null
          interview_year: number
          job_role_id: string
          like_count: number
          overall_review: string
          proof_url: string
          result_wait_time_type: Database["public"]["Enums"]["result_wait_time_type"]
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          atmosphere_score: number
          company_name: string
          created_at?: string
          difficulty: Database["public"]["Enums"]["difficulty_type"]
          employment_type: Database["public"]["Enums"]["employment_type"]
          final_status_type: Database["public"]["Enums"]["final_status_type"]
          id?: string
          interview_personnel_type: Database["public"]["Enums"]["interview_personnel_type"]
          interview_season: Database["public"]["Enums"]["interview_season_type"]
          interview_tip?: string | null
          interview_year: number
          job_role_id?: string
          like_count?: number
          overall_review: string
          proof_url: string
          result_wait_time_type: Database["public"]["Enums"]["result_wait_time_type"]
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Update: {
          atmosphere_score?: number
          company_name?: string
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_type"]
          employment_type?: Database["public"]["Enums"]["employment_type"]
          final_status_type?: Database["public"]["Enums"]["final_status_type"]
          id?: string
          interview_personnel_type?: Database["public"]["Enums"]["interview_personnel_type"]
          interview_season?: Database["public"]["Enums"]["interview_season_type"]
          interview_tip?: string | null
          interview_year?: number
          job_role_id?: string
          like_count?: number
          overall_review?: string
          proof_url?: string
          result_wait_time_type?: Database["public"]["Enums"]["result_wait_time_type"]
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "interview_review_job_role_id_fkey"
            columns: ["job_role_id"]
            isOneToOne: false
            referencedRelation: "job_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Interview_review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_role: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      like: {
        Row: {
          answer_id: string | null
          comment_id: string | null
          created_at: string
          id: string
          post_id: string | null
          review_id: string | null
          user_id: string
        }
        Insert: {
          answer_id?: string | null
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          review_id?: string | null
          user_id?: string
        }
        Update: {
          answer_id?: string | null
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          review_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "interview_review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          bookmark_count: number
          category_id: string
          comment_count: number
          content: string
          create_at: string
          id: string
          idx: number
          image_urls: string[] | null
          slug: string
          title: string
          update_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          bookmark_count: number
          category_id?: string
          comment_count: number
          content: string
          create_at?: string
          id?: string
          idx?: number
          image_urls?: string[] | null
          slug: string
          title: string
          update_at?: string
          user_id?: string
          view_count: number
        }
        Update: {
          bookmark_count?: number
          category_id?: string
          comment_count?: number
          content?: string
          create_at?: string
          id?: string
          idx?: number
          image_urls?: string[] | null
          slug?: string
          title?: string
          update_at?: string
          user_id?: string
          view_count?: number
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
      post_category: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      post_stats: {
        Row: {
          comment_count: number
          id: string
          like_count: number
          view_count: number
        }
        Insert: {
          comment_count?: number
          id?: string
          like_count?: number
          view_count?: number
        }
        Update: {
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
            referencedRelation: "post"
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
            referencedRelation: "post"
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
      project: {
        Row: {
          created_at: string
          deploy_url: string | null
          description: string | null
          end_date: string | null
          github_url: string | null
          id: string
          project_type: Database["public"]["Enums"]["project_type_enum"]
          service_purpose: string
          slug: string
          start_date: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deploy_url?: string | null
          description?: string | null
          end_date?: string | null
          github_url?: string | null
          id?: string
          project_type: Database["public"]["Enums"]["project_type_enum"]
          service_purpose: string
          slug: string
          start_date?: string | null
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          deploy_url?: string | null
          description?: string | null
          end_date?: string | null
          github_url?: string | null
          id?: string
          project_type?: Database["public"]["Enums"]["project_type_enum"]
          service_purpose?: string
          slug?: string
          start_date?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_function: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_function_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_performance: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_performance_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_retrospective: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_retrospective_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_role: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_role_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tech_stack: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_tech_stack_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project_troubleshooting: {
        Row: {
          description: string | null
          id: string
          project_id: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_troubleshooting_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
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
      question_status: {
        Row: {
          question_id: string
          status: Database["public"]["Enums"]["status"]
          user_id: string
        }
        Insert: {
          question_id: string
          status?: Database["public"]["Enums"]["status"]
          user_id?: string
        }
        Update: {
          question_id?: string
          status?: Database["public"]["Enums"]["status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_status_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: true
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      question_tech_stack: {
        Row: {
          question_id: string
          tech_stack_id: string
        }
        Insert: {
          question_id?: string
          tech_stack_id?: string
        }
        Update: {
          question_id?: string
          tech_stack_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_tech_stack_questions_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_tech_stack_tech_stack_id_fkey"
            columns: ["tech_stack_id"]
            isOneToOne: false
            referencedRelation: "tech_stack"
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
      review_content: {
        Row: {
          interview_tip: string | null
          overall_review: string
          review_id: string
        }
        Insert: {
          interview_tip?: string | null
          overall_review: string
          review_id?: string
        }
        Update: {
          interview_tip?: string | null
          overall_review?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_content_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "interview_review"
            referencedColumns: ["id"]
          },
        ]
      }
      review_process_map: {
        Row: {
          processes_id: string
          review_id: string
        }
        Insert: {
          processes_id?: string
          review_id?: string
        }
        Update: {
          processes_id?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_process_map_processes_id_fkey"
            columns: ["processes_id"]
            isOneToOne: false
            referencedRelation: "interview_processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_process_map_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "interview_review"
            referencedColumns: ["id"]
          },
        ]
      }
      review_question_type: {
        Row: {
          display_order: number
          id: string
          name: string
        }
        Insert: {
          display_order?: number
          id?: string
          name: string
        }
        Update: {
          display_order?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      review_question_type_map: {
        Row: {
          question_type_id: string
          review_id: string
        }
        Insert: {
          question_type_id?: string
          review_id?: string
        }
        Update: {
          question_type_id?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_question_type_map_question_type_id_fkey"
            columns: ["question_type_id"]
            isOneToOne: false
            referencedRelation: "review_question_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_question_type_map_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "interview_review"
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
      tech_stack: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name?: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_questions_with_all_techs: {
        Args: { tech_slugs: string[] }
        Returns: {
          created_at: string
          id: string
          idx: number
          question_type: Database["public"]["Enums"]["question_type"]
          slug: string
          title: string
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "questions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      increment_review_view: { Args: { target_id: string }; Returns: undefined }
      increment_view_count: { Args: { target_idx: number }; Returns: undefined }
      toggle_bookmark: { Args: { p_question_id: string }; Returns: boolean }
      toggle_like: {
        Args: { p_target_id: string; p_type: string }
        Returns: boolean
      }
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
      category_type_enum:
        | "FrontEnd"
        | "BackEnd"
        | "CS"
        | "인성면접"
        | "Infra"
        | "AI"
        | "Android"
        | "iOS"
      difficulty_type: "쉬움" | "보통" | "어려움"
      employment_type: "신입" | "경력" | "인턴" | "계약직"
      final_status_type: "합격" | "불합격" | "진행중"
      interview_personnel_type: "1:1" | "면접관 다수" | "그룹 면접"
      interview_season_type: "상반기" | "하반기"
      project_type_enum: "team" | "personal"
      question_type: "pickdap" | "user"
      result_wait_time_type:
        | "1일"
        | "2~3일"
        | "4~5일"
        | "1주"
        | "2~3주"
        | "한 달 이상"
        | "결과 대기중"
      social_provider: "email" | "google" | "github" | "kakao"
      status: "pending" | "completed"
      tag_type: "카테고리" | "기술스택" | "상태" | "면접결과" | "인기"
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
      difficulty_type: ["쉬움", "보통", "어려움"],
      employment_type: ["신입", "경력", "인턴", "계약직"],
      final_status_type: ["합격", "불합격", "진행중"],
      interview_personnel_type: ["1:1", "면접관 다수", "그룹 면접"],
      interview_season_type: ["상반기", "하반기"],
      project_type_enum: ["team", "personal"],
      question_type: ["pickdap", "user"],
      result_wait_time_type: [
        "1일",
        "2~3일",
        "4~5일",
        "1주",
        "2~3주",
        "한 달 이상",
        "결과 대기중",
      ],
      social_provider: ["email", "google", "github", "kakao"],
      status: ["pending", "completed"],
      tag_type: ["카테고리", "기술스택", "상태", "면접결과", "인기"],
      user_role: ["user", "admin"],
    },
  },
} as const
