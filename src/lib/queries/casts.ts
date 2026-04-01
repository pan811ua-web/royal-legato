import { createClient } from "@/lib/supabase/server";

export async function getActiveCasts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casts")
    .select(`*, cast_photos(url, is_main, sort_order), cast_tags(tag)`)
    .eq("status", "active")
    .order("sort_order", { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getCastById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casts")
    .select(`*, cast_photos(url, is_main, sort_order), cast_tags(tag)`)
    .eq("id", id)
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function getCastsWithTodaySchedule() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("casts")
    .select(`*, cast_photos(url, is_main, sort_order), cast_tags(tag), schedules!inner(schedule_date, start_time, end_time, status)`)
    .eq("status", "active")
    .eq("schedules.schedule_date", today)
    .order("sort_order", { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getCastsByDate(date: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("casts")
    .select(`*, cast_photos(url, is_main, sort_order), cast_tags(tag), schedules!inner(schedule_date, start_time, end_time, status)`)
    .eq("status", "active")
    .eq("schedules.schedule_date", date)
    .order("sort_order", { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}
