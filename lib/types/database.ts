export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      committees: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          responsibilities: string[]
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string
          id: string
          name: string
          responsibilities?: string[]
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          responsibilities?: string[]
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          agreed_to_photo_release: boolean
          agreed_to_rules: boolean
          availability: string[]
          created_at: string
          email: string
          emergency_contact_name: string
          emergency_contact_phone: string
          full_name: string
          id: string
          maker_experience_details: string | null
          maker_hardware_experience: string[]
          organization_or_school: string | null
          past_volunteer_experience: string | null
          phone: string
          primary_committee_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          secondary_committee_id: string | null
          status: 'pending' | 'approved' | 'rejected' | 'waitlist'
          tshirt_size: string
          updated_at: string
        }
        Insert: {
          agreed_to_photo_release?: boolean
          agreed_to_rules?: boolean
          availability?: string[]
          created_at?: string
          email: string
          emergency_contact_name: string
          emergency_contact_phone: string
          full_name: string
          id?: string
          maker_experience_details?: string | null
          maker_hardware_experience?: string[]
          organization_or_school?: string | null
          past_volunteer_experience?: string | null
          phone: string
          primary_committee_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          secondary_committee_id?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'waitlist'
          tshirt_size: string
          updated_at?: string
        }
        Update: {
          agreed_to_photo_release?: boolean
          agreed_to_rules?: boolean
          availability?: string[]
          created_at?: string
          email?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          full_name?: string
          id?: string
          maker_experience_details?: string | null
          maker_hardware_experience?: string[]
          organization_or_school?: string | null
          past_volunteer_experience?: string | null
          phone?: string
          primary_committee_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          secondary_committee_id?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'waitlist'
          tshirt_size?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_applications_primary_committee_id_fkey"
            columns: ["primary_committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_applications_secondary_committee_id_fkey"
            columns: ["secondary_committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Committee = Database['public']['Tables']['committees']['Row']
export type VolunteerApplication = Database['public']['Tables']['volunteer_applications']['Row']
export type VolunteerApplicationInsert = Database['public']['Tables']['volunteer_applications']['Insert']
