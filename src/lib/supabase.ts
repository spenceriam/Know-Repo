import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          github_username: string | null
          avatar_url: string | null
          github_provider_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          github_username?: string | null
          avatar_url?: string | null
          github_provider_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          github_username?: string | null
          avatar_url?: string | null
          github_provider_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          project_name: string
          github_repo_fullname: string
          shareable_link_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_name: string
          github_repo_fullname: string
          shareable_link_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_name?: string
          github_repo_fullname?: string
          shareable_link_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          project_id: string
          guest_email: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          guest_email: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          guest_email?: string
          created_at?: string
        }
      }
    }
  }
} 