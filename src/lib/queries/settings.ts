import { createClient } from "@/lib/supabase/server";

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  if (!data) return {};
  return Object.fromEntries(data.map((r) => [r.key, r.value]));
}
