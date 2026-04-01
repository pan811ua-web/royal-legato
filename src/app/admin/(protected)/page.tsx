import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [castsRes, schedulesRes, newsRes, subsRes] = await Promise.all([
    supabase.from("casts").select("id", { count: "exact" }).eq("status", "active"),
    supabase.from("schedules").select("id", { count: "exact" }).eq("schedule_date", new Date().toISOString().split("T")[0]),
    supabase.from("news").select("id", { count: "exact" }).eq("publish_status", "publish"),
    supabase.from("subscribers").select("id", { count: "exact" }),
  ]);

  const stats = [
    { label: "在籍キャスト", value: castsRes.count ?? 0, href: "/admin/casts", icon: "👤" },
    { label: "本日出勤", value: schedulesRes.count ?? 0, href: "/admin/schedules", icon: "📅" },
    { label: "公開ニュース", value: newsRes.count ?? 0, href: "/admin/news", icon: "📰" },
    { label: "メルマガ登録", value: subsRes.count ?? 0, href: "#", icon: "📧" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-wider mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-white border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs tracking-widest">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-3xl font-light text-[var(--teal)]">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 p-5">
          <h2 className="text-sm tracking-widest text-gray-500 mb-4">クイックアクション</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/casts/new"
              className="bg-[var(--teal)] text-white text-xs tracking-widest px-4 py-3 text-center hover:bg-[var(--teal-dark)] transition-colors">
              + キャストを追加
            </Link>
            <Link href="/admin/schedules"
              className="border border-[var(--teal)] text-[var(--teal)] text-xs tracking-widest px-4 py-3 text-center hover:bg-[var(--teal-light)] transition-colors">
              出勤スケジュールを管理
            </Link>
            <Link href="/admin/news"
              className="border border-gray-200 text-gray-600 text-xs tracking-widest px-4 py-3 text-center hover:bg-gray-50 transition-colors">
              ニュースを投稿
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5">
          <h2 className="text-sm tracking-widest text-gray-500 mb-4">本日の出勤</h2>
          {(schedulesRes.count ?? 0) === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">本日の出勤登録はありません</p>
          ) : (
            <Link href="/admin/schedules" className="text-sm text-[var(--teal)] tracking-wider hover:underline">
              {schedulesRes.count}名が出勤予定 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
