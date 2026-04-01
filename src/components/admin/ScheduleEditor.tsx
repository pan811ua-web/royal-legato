"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Cast = { id: string; name: string; rank: string };
type Schedule = {
  id: string;
  cast_id: string;
  schedule_date: string;
  start_time: string;
  end_time: string | null;
  status: string;
  casts: { name: string; rank: string } | null;
};

const statusOptions = [
  { value: "scheduled", label: "出勤予定", color: "bg-blue-100 text-blue-700" },
  { value: "working", label: "出勤中", color: "bg-green-100 text-green-700" },
  { value: "done", label: "終了", color: "bg-gray-100 text-gray-500" },
  { value: "absent", label: "欠勤", color: "bg-red-100 text-red-500" },
];

export default function ScheduleEditor({ selectedDate, casts, schedules: initialSchedules }: {
  selectedDate: string;
  casts: Cast[];
  schedules: Schedule[];
}) {
  const router = useRouter();
  const [schedules, setSchedules] = useState(initialSchedules);
  const [form, setForm] = useState({ cast_id: "", start_time: "18:00", end_time: "26:00" });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i - 3);
    return d.toISOString().split("T")[0];
  });

  const scheduledCastIds = new Set(schedules.map((s) => s.cast_id));
  const unscheduledCasts = casts.filter((c) => !scheduledCastIds.has(c.id));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cast_id) { setError("キャストを選択してください"); return; }
    setAdding(true);
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("schedules")
      .insert({ cast_id: form.cast_id, schedule_date: selectedDate, start_time: form.start_time, end_time: form.end_time || null, status: "scheduled" })
      .select("*, casts(name, rank)")
      .single();
    if (error) { setError(error.message); setAdding(false); return; }
    setSchedules((prev) => [...prev, data]);
    setForm({ cast_id: "", start_time: "18:00", end_time: "26:00" });
    setAdding(false);
  };

  const handleStatusChange = async (scheduleId: string, newStatus: string) => {
    const supabase = createClient();
    await supabase.from("schedules").update({ status: newStatus }).eq("id", scheduleId);
    setSchedules((prev) => prev.map((s) => s.id === scheduleId ? { ...s, status: newStatus } : s));
  };

  const handleDelete = async (scheduleId: string) => {
    const supabase = createClient();
    await supabase.from("schedules").delete().eq("id", scheduleId);
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
  };

  const handleTimeUpdate = async (scheduleId: string, field: "start_time" | "end_time", value: string) => {
    const supabase = createClient();
    await supabase.from("schedules").update({ [field]: value || null }).eq("id", scheduleId);
    setSchedules((prev) => prev.map((s) => s.id === scheduleId ? { ...s, [field]: value } : s));
  };

  return (
    <div>
      {/* Date nav */}
      <div className="bg-white border border-gray-100 overflow-x-auto mb-4">
        <div className="flex min-w-max">
          {days.map((d) => {
            const label = new Date(d + "T00:00:00").toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", weekday: "short" });
            return (
              <Link key={d} href={`/admin/schedules?date=${d}`}
                className={`px-4 py-3 text-xs tracking-widest whitespace-nowrap transition-colors
                  ${d === selectedDate ? "bg-[var(--teal)] text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add form */}
      <div className="bg-white border border-gray-100 p-5 mb-4">
        <h2 className="text-xs tracking-widest text-gray-400 mb-3">出勤を追加</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">キャスト</label>
            <select value={form.cast_id} onChange={(e) => setForm({ ...form, cast_id: e.target.value })}
              className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)] min-w-[140px]">
              <option value="">選択してください</option>
              {unscheduledCasts.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.rank})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">開始時間</label>
            <input type="text" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })}
              placeholder="18:00"
              className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)] w-24" />
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">終了時間</label>
            <input type="text" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })}
              placeholder="26:00"
              className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)] w-24" />
          </div>
          <button type="submit" disabled={adding}
            className="bg-[var(--teal)] text-white text-xs tracking-widest px-5 py-2 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60">
            {adding ? "追加中..." : "+ 追加"}
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        {unscheduledCasts.length === 0 && (
          <p className="text-xs text-gray-400 mt-2">全キャストが登録済みです</p>
        )}
      </div>

      {/* Schedule list */}
      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">キャスト</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">開始</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">終了</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">ステータス</th>
              <th className="py-3 px-4 text-right text-xs tracking-widest text-gray-400 font-normal">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {schedules.map((s) => {
              const statusInfo = statusOptions.find((o) => o.value === s.status) ?? statusOptions[0];
              return (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{s.casts?.name ?? "—"}</td>
                  <td className="py-3 px-4">
                    <input type="text" defaultValue={s.start_time.slice(0, 5)}
                      onBlur={(e) => handleTimeUpdate(s.id, "start_time", e.target.value)}
                      className="border border-gray-200 px-2 py-1 text-xs w-20 focus:outline-none focus:border-[var(--teal)]" />
                  </td>
                  <td className="py-3 px-4">
                    <input type="text" defaultValue={s.end_time?.slice(0, 5) ?? ""}
                      onBlur={(e) => handleTimeUpdate(s.id, "end_time", e.target.value)}
                      className="border border-gray-200 px-2 py-1 text-xs w-20 focus:outline-none focus:border-[var(--teal)]" />
                  </td>
                  <td className="py-3 px-4">
                    <select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value)}
                      className={`text-[10px] tracking-widest px-2 py-1 border-0 cursor-pointer ${statusInfo.color}`}>
                      {statusOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDelete(s.id)}
                      className="text-red-400 text-xs tracking-widest hover:underline">削除</button>
                  </td>
                </tr>
              );
            })}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400 text-sm tracking-widest">
                  この日の出勤はまだ登録されていません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
