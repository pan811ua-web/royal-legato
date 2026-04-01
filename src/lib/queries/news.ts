import { createClient } from "@/lib/supabase/server";

export async function getPublishedNews(limit = 5) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("publish_status", "publish")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) { console.error(error); return []; }
  return data ?? [];
}
