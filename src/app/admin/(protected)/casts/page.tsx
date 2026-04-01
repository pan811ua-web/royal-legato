import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import CastStatusToggle from "@/components/admin/CastStatusToggle";

export default async function AdminCastsPage() {
  const supabase = await createClient();
  const { data: casts } = await supabase
    .from("casts")
    .select("*, cast_photos(url, is_main)")
    .order("sort_order", { ascending: true });

  const statusLabel: Record<string, string> = {
    active: "在籍中",
    pause: "休憩中",
    hidden: "非表示",
  };
  const statusColor: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    pause: "bg-yellow-100 text-yellow-700",
    hidden: "bg-gray-100 text-gray-500",
  };
  const rankColor: Record<string, string> = {
    DIAMOND: "text-cyan-600",
    PLATINUM: "text-purple-600",
    GOLD: "text-yellow-600",
    SILVER: "text-gray-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold tracking-wider">キャスト管理</h1>
        <Link href="/admin/casts/new"
          className="bg-[var(--teal)] text-white text-xs tracking-widest px-5 py-2.5 hover:bg-[var(--teal-dark)] transition-colors">
          + 新規追加
        </Link>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal w-16">写真</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">名前</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">ランク</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">ステータス</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">NEW</th>
              <th className="py-3 px-4 text-right text-xs tracking-widest text-gray-400 font-normal">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(casts ?? []).map((cast) => {
              const mainPhoto = cast.cast_photos?.find((p: { is_main: boolean }) => p.is_main) ?? cast.cast_photos?.[0];
              return (
                <tr key={cast.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-10 h-12 bg-gray-100 overflow-hidden">
                      {mainPhoto ? (
                        <img src={mainPhoto.url} alt={cast.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">👤</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{cast.name}</td>
                  <td className={`py-3 px-4 text-xs font-medium ${rankColor[cast.rank] ?? ""}`}>◆ {cast.rank}</td>
                  <td className="py-3 px-4">
                    <CastStatusToggle castId={cast.id} currentStatus={cast.status} />
                  </td>
                  <td className="py-3 px-4">
                    {cast.new_badge && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 tracking-widest">NEW</span>}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/admin/casts/${cast.id}`}
                      className="text-[var(--teal)] text-xs tracking-widest hover:underline">
                      編集
                    </Link>
                  </td>
                </tr>
              );
            })}
            {(casts ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 text-sm tracking-widest">
                  キャストが登録されていません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
