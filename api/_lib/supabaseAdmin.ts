import { createClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface Database {
  public: {
    Tables: {
      interaction_events: {
        Row: {
          id: string;
          kind: string;
          event_name: string;
          path: string | null;
          intent: string | null;
          session_id: string;
          metadata: Json;
          ip_hash: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          kind: string;
          event_name: string;
          path?: string | null;
          intent?: string | null;
          session_id: string;
          metadata?: Json;
          ip_hash?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: Partial<{
          id: string;
          kind: string;
          event_name: string;
          path: string | null;
          intent: string | null;
          session_id: string;
          metadata: Json;
          ip_hash: string | null;
          user_agent: string | null;
          created_at: string;
        }>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          intent: string;
          name: string;
          email: string;
          business: string | null;
          site_url: string | null;
          idea: string | null;
          message: string;
          session_id: string | null;
          audit_score: number | null;
          audit_findings: Json;
          scope_estimate: string | null;
          attribution: Json;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          intent: string;
          name: string;
          email: string;
          business?: string | null;
          site_url?: string | null;
          idea?: string | null;
          message: string;
          session_id?: string | null;
          audit_score?: number | null;
          audit_findings?: Json;
          scope_estimate?: string | null;
          attribution?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          id: string;
          intent: string;
          name: string;
          email: string;
          business: string | null;
          site_url: string | null;
          idea: string | null;
          message: string;
          session_id: string | null;
          audit_score: number | null;
          audit_findings: Json;
          scope_estimate: string | null;
          attribution: Json;
          status: string;
          created_at: string;
          updated_at: string;
        }>;
        Relationships: [];
      };
      rate_limits: {
        Row: {
          key: string;
          window_start: string;
          count: number;
        };
        Insert: {
          key: string;
          window_start?: string;
          count?: number;
        };
        Update: Partial<{
          key: string;
          window_start: string;
          count: number;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      check_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: boolean;
      };
      prune_rate_limits: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. Add them as server-side env vars in Vercel (never prefix them with VITE_)."
    );
  }

  if (!cachedClient) {
    cachedClient = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}