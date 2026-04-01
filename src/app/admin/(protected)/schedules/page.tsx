import { createClient } from "@/lib/supabase/server";
import ScheduleEditor from "@/components/admin/ScheduleEditor";

export default async function AdminSchedulesPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams;
  const today = new Date().toISOString().split("T")[0];
  const selectedDate = date ?? today;

  const supabase = await createClient();
  const [castsRes, schedulesRes] = await Promise.all([
    supabase.from("casts").select("id, name, rank").eq("status", "active").order("sort_order"),
    supabase.from("schedules").select("*, casts(name, rank)").eq("schedule_date", selectedDate),
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-wider mb-6">出勤管理</h1>
      <ScheduleEditor
        selectedDate={selectedDate}
        casts={castsRes.data ?? []}
        schedules={schedulesRes.data ?? []}
      />
    </div>
  );
}
