import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import NewsActions from "@/components/admin/NewsActions";

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  const statusLabel: Record<string, string> = { publish: "公開", draft: "下書き", scheduled: "予約" };
  const statusColor: Record<string, string> = {
    publish: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-500",
    scheduled: "bg-blue-100 text-blue-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold tracking-wider">ニュース管理</h1>
        <Link href="/admin/news/new"
          className="bg-[var(--teal)] text-white text-xs tracking-widest px-5 py-2.5 hover:bg-[var(--teal-dark)] transition-colors">
          + 新規投稿
        </Link>
      </div>
      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">タイトル</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">カテゴリ</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">ステータス</th>
              <th className="py-3 px-4 text-left text-xs tracking-widest text-gray-400 font-normal">公開日</th>
              <th className="py-3 px-4 text-right text-xs tracking-widest text-gray-400 font-normal">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(news ?? []).map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 max-w-xs truncate">{item.title}</td>
                <td className="py-3 px-4 text-xs text-gray-500">{item.category}</td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] tracking-widest px-2 py-0.5 ${statusColor[item.publish_status] ?? ""}`}>
                    {statusLabel[item.publish_status] ?? item.publish_status}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-gray-400">
                  {item.published_at ? new Date(item.published_at).toLocaleDateString("ja-JP") : "—"}
                </td>
                <td className="py-3 px-4 text-right">
                  <NewsActions newsId={item.id} />
                </td>
              </tr>
            ))}
            {(news ?? []).length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-gray-400 text-sm tracking-widest">ニュースがありません</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
