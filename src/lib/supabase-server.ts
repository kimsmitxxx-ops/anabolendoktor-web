import "server-only";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rexqfwibxawqnvrzbdoo.supabase.co";
const SB_ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJleHFmd2lieGF3cW52cnpiZG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODM1NzIsImV4cCI6MjA5MjM1OTU3Mn0.XQGZNdGcnZlALl7truWiPC5_uMYeMhWwIneTMNO8AhI";

export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(SB_URL, SB_ANON, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
      set(name: string, value: string, options: CookieOptions) { try { cookieStore.set({ name, value, ...options }); } catch {} },
      remove(name: string, options: CookieOptions) { try { cookieStore.set({ name, value: "", ...options, maxAge: 0 }); } catch {} },
    },
  });
}

export async function getCurrentUser() {
  try {
    const sb = createServerSupabase();
    const { data: { user } } = await sb.auth.getUser();
    return user;
  } catch { return null; }
}
