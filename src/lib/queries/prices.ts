import { createClient } from "@/lib/supabase/server";

export async function getPrices() {
  const supabase = await createClient();
  const [coursesRes, extrasRes] = await Promise.all([
    supabase.from("price_courses").select("*").order("sort_order"),
    supabase.from("price_rank_extras").select("*"),
  ]);
  return {
    courses: coursesRes.data ?? [],
    extras: extrasRes.data ?? [],
  };
}
