"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type NewsData = { id?: string; title?: string; body?: string; category?: string; publish_status?: string; published_at?: string };

export default function NewsForm({ news }: { news?: NewsData }) {
  const router = useRouter();
  const isEdit = !!news?.id;
  const [form, setForm] = useState({
    title: news?.title ?? "",
    body: news?.body ?? "",
    category: news?.category ?? "お知らせ",
    publish_status: news?.publish_status ?? "draft",
    published_at: news?.published_at ? news.published_at.slice(0, 16) : new Date().toISOString().slice(0, 16),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const data = {
      title: form.title,
      body: form.body || null,
      category: form.category,
      publish_status: form.publish_status,
      published_at: form.publish_status === "publish" ? (form.published_at || new Date().toISOString()) : form.published_at || null,
    };
    const { error } = isEdit
      ? await supabase.from("news").update(data).eq("id", news!.id!)
      : await supabase.from("news").insert(data);
    if (error) { setError(error.message); setSaving(false); return; }
    router.push("/admin/news");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white border border-gray-100 p-6 mb-4 flex flex-col gap-4">
        <div>
          <label className="text-xs tracking-widest text-gray-400 block mb-1">タイトル *</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">カテゴリ</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]">
              {["新人情報", "キャンペーン", "お知らせ", "イベント"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">ステータス</label>
            <select value={form.publish_status} onChange={(e) => setForm({ ...form, publish_status: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]">
              <option value="draft">下書き</option>
              <option value="publish">公開</option>
              <option value="scheduled">予約投稿</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs tracking-widest text-gray-400 block mb-1">公開日時</label>
          <input type="datetime-local" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })}
            className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
        </div>
        <div>
          <label className="text-xs tracking-widest text-gray-400 block mb-1">本文</label>
          <textarea rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)] resize-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-[var(--teal)] text-white text-xs tracking-widest px-8 py-3 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60">
          {saving ? "保存中..." : isEdit ? "更新する" : "投稿する"}
        </button>
        <button type="button" onClick={() => router.push("/admin/news")}
          className="border border-gray-200 text-gray-500 text-xs tracking-widest px-6 py-3 hover:bg-gray-50">
          キャンセル
        </button>
      </div>
    </form>
  );
}
