export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      apartment_feature_links: {
        Row: {
          apartment_id: string
          feature_id: string
        }
        Insert: {
          apartment_id: string
          feature_id: string
        }
        Update: {
          apartment_id?: string
          feature_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apartment_feature_links_apartment_id_fkey"
            columns: ["apartment_id"]
            isOneToOne: false
            referencedRelation: "apartments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartment_feature_links_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "apartment_features"
            referencedColumns: ["id"]
          },
        ]
      }
      apartment_features: {
        Row: {
          category: string
          id: string
          name: string
        }
        Insert: {
          category: string
          id?: string
          name: string
        }
        Update: {
          category?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      apartment_rooms: {
        Row: {
          apartment_id: string | null
          area: number
          bed_count: number | null
          bed_type: string | null
          has_ac: boolean | null
          has_heating: boolean | null
          id: string
          room_type: Database["public"]["Enums"]["room_type"]
        }
        Insert: {
          apartment_id?: string | null
          area: number
          bed_count?: number | null
          bed_type?: string | null
          has_ac?: boolean | null
          has_heating?: boolean | null
          id?: string
          room_type: Database["public"]["Enums"]["room_type"]
        }
        Update: {
          apartment_id?: string | null
          area?: number
          bed_count?: number | null
          bed_type?: string | null
          has_ac?: boolean | null
          has_heating?: boolean | null
          id?: string
          room_type?: Database["public"]["Enums"]["room_type"]
        }
        Relationships: [
          {
            foreignKeyName: "apartment_rooms_apartment_id_fkey"
            columns: ["apartment_id"]
            isOneToOne: false
            referencedRelation: "apartments"
            referencedColumns: ["id"]
          },
        ]
      }
      apartments: {
        Row: {
          apartment_type: Database["public"]["Enums"]["apartment_type"]
          bathroom_count: number
          bedroom_count: number
          created_at: string | null
          description: string
          embedding: string | null
          has_parking: boolean | null
          has_yard: boolean | null
          id: string
          location_address: string
          location_city: string
          location_coordinates: unknown
          max_occupancy: number
          price_per_month: number
          title: string
          total_area: number
          updated_at: string | null
          yard_area: number | null
        }
        Insert: {
          apartment_type: Database["public"]["Enums"]["apartment_type"]
          bathroom_count: number
          bedroom_count: number
          created_at?: string | null
          description: string
          embedding?: string | null
          has_parking?: boolean | null
          has_yard?: boolean | null
          id?: string
          location_address: string
          location_city: string
          location_coordinates: unknown
          max_occupancy: number
          price_per_month: number
          title: string
          total_area: number
          updated_at?: string | null
          yard_area?: number | null
        }
        Update: {
          apartment_type?: Database["public"]["Enums"]["apartment_type"]
          bathroom_count?: number
          bedroom_count?: number
          created_at?: string | null
          description?: string
          embedding?: string | null
          has_parking?: boolean | null
          has_yard?: boolean | null
          id?: string
          location_address?: string
          location_city?: string
          location_coordinates?: unknown
          max_occupancy?: number
          price_per_month?: number
          title?: string
          total_area?: number
          updated_at?: string | null
          yard_area?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_apartments: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          title: string
          description: string
          apartment_type: Database["public"]["Enums"]["apartment_type"]
          price_per_month: number
          bedroom_count: number
          location_city: string
          has_yard: boolean
          yard_area: number
          room_details: Json
          similarity: number
        }[]
      }
    }
    Enums: {
      apartment_type: "studio" | "apartment" | "house" | "villa"
      room_type: "bedroom" | "living_room" | "kitchen" | "bathroom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

