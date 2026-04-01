"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(settings: Record<string, string>): Promise<{ error?: string }> {
  const supabase = createAdminClient();
  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase
      .from("site_settings")
      .update({ value })
      .eq("key", key);
    if (error) return { error: error.message };
  }
  revalidatePath("/ja");
  revalidatePath("/ja/schedule");
  return {};
}
