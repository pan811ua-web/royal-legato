"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { saveCast } from "@/lib/actions/castActions";

type CastData = {
  id?: string;
  name?: string;
  age?: number;
  height?: number;
  bust?: number;
  cup?: string;
  waist?: number;
  hip?: number;
  rank?: string;
  status?: string;
  new_badge?: boolean;
  pr?: string;
  sort_order?: number;
  cast_tags?: { tag: string }[];
  cast_photos?: { id: string; url: string; is_main: boolean; sort_order: number }[];
};

export default function CastForm({ cast }: { cast?: CastData }) {
  const router = useRouter();
  const isEdit = !!cast?.id;

  const [form, setForm] = useState({
    name: cast?.name ?? "",
    age: cast?.age?.toString() ?? "",
    height: cast?.height?.toString() ?? "",
    bust: cast?.bust?.toString() ?? "",
    cup: cast?.cup ?? "",
    waist: cast?.waist?.toString() ?? "",
    hip: cast?.hip?.toString() ?? "",
    rank: cast?.rank ?? "SILVER",
    status: cast?.status ?? "active",
    new_badge: cast?.new_badge ?? true,
    pr: cast?.pr ?? "",
    sort_order: cast?.sort_order?.toString() ?? "0",
    tags: cast?.cast_tags?.map((t) => t.tag).join(", ") ?? "",
  });

  const [photos, setPhotos] = useState<{ id?: string; url: string; is_main: boolean }[]>(
    cast?.cast_photos?.sort((a, b) => a.sort_order - b.sort_order) ?? []
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (photos.length + files.length > 8) {
      setError("写真は最大8枚です");
      return;
    }
    setUploading(true);
    const supabase = createClient();
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${cast?.id ?? "new"}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from("cast-photos").upload(path, file, { upsert: false });
      if (error) { setError("アップロードエラー: " + error.message); continue; }
      const { data: { publicUrl } } = supabase.storage.from("cast-photos").getPublicUrl(data.path);
      setPhotos((prev) => [...prev, { url: publicUrl, is_main: prev.length === 0 }]);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDeletePhoto = async (index: number) => {
    const photo = photos[index];
    const supabase = createClient();
    if (photo.id) {
      await supabase.from("cast_photos").delete().eq("id", photo.id);
    }
    const newPhotos = photos.filter((_, i) => i !== index);
    if (photo.is_main && newPhotos.length > 0) newPhotos[0].is_main = true;
    setPhotos(newPhotos);
  };

  const handleSetMain = (index: number) => {
    setPhotos(photos.map((p, i) => ({ ...p, is_main: i === index })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10);

    const result = await saveCast({
      id: cast?.id,
      name: form.name,
      age: Number(form.age),
      height: form.height ? Number(form.height) : null,
      bust: form.bust ? Number(form.bust) : null,
      cup: form.cup || null,
      waist: form.waist ? Number(form.waist) : null,
      hip: form.hip ? Number(form.hip) : null,
      rank: form.rank,
      status: form.status,
      new_badge: form.new_badge,
      pr: form.pr || null,
      sort_order: Number(form.sort_order),
      tags,
      photos,
    });

    if (result.error) {
      setError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/casts");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white border border-gray-100 p-6 mb-4">
        <h2 className="text-sm tracking-widest text-gray-500 mb-4">基本情報</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs tracking-widest text-gray-400 block mb-1">名前 *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
          </div>
          {([
            { key: "age", label: "年齢 *", required: true },
            { key: "height", label: "身長 (cm) *", required: true },
            { key: "bust", label: "バスト (cm)", required: false },
            { key: "waist", label: "ウエスト (cm)", required: false },
            { key: "hip", label: "ヒップ (cm)", required: false },
          ] as { key: string; label: string; required: boolean }[]).map(({ key, label, required }) => (
            <div key={key}>
              <label className="text-xs tracking-widest text-gray-400 block mb-1">{label}</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required={required}
                value={form[key as keyof typeof form] as string}
                onKeyDown={(e) => {
                  if (!/^[0-9]$/.test(e.key) && !["Backspace","Delete","ArrowLeft","ArrowRight","Tab"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setForm({ ...form, [key]: e.target.value.replace(/[^0-9]/g, "") })}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]"
              />
            </div>
          ))}
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">カップ</label>
            <select value={form.cup} onChange={(e) => setForm({ ...form, cup: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]">
              <option value="">未選択</option>
              {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((c) => (
                <option key={c} value={c}>{c}カップ</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">ランク</label>
            <select value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]">
              {["DIAMOND", "PLATINUM", "GOLD", "SILVER"].map((r) => (
                <option key={r} value={r}>◆ {r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">ステータス</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]">
              <option value="active">在籍中</option>
              <option value="pause">休憩中</option>
              <option value="hidden">非表示</option>
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-gray-400 block mb-1">表示順</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <input type="checkbox" id="new_badge" checked={form.new_badge}
              onChange={(e) => setForm({ ...form, new_badge: e.target.checked })} className="w-4 h-4 accent-[var(--teal)]" />
            <label htmlFor="new_badge" className="text-sm text-gray-600">NEWバッジを表示</label>
          </div>
          <div className="col-span-2">
            <label className="text-xs tracking-widest text-gray-400 block mb-1">タグ（カンマ区切り・最大10個）</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="清楚系, スレンダー, 甘えん坊"
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
          </div>
          <div className="col-span-2">
            <label className="text-xs tracking-widest text-gray-400 block mb-1">自己PR</label>
            <textarea rows={4} value={form.pr} onChange={(e) => setForm({ ...form, pr: e.target.value })}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)] resize-none" />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white border border-gray-100 p-6 mb-4">
        <h2 className="text-sm tracking-widest text-gray-500 mb-4">写真（最大8枚）</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {photos.map((p, i) => (
            <div key={i} className="relative w-20 h-24 bg-gray-100 group">
              <img src={p.url} alt="" className="w-full h-full object-cover" />
              {p.is_main && (
                <span className="absolute bottom-0 left-0 right-0 bg-[var(--teal)] text-white text-[8px] text-center tracking-widest py-0.5">MAIN</span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 items-center justify-center">
                {!p.is_main && (
                  <button type="button" onClick={() => handleSetMain(i)}
                    className="text-[9px] text-white bg-[var(--teal)] px-1.5 py-0.5 tracking-widest">MAIN</button>
                )}
                <button type="button" onClick={() => handleDeletePhoto(i)}
                  className="text-[9px] text-white bg-red-500 px-1.5 py-0.5 tracking-widest">削除</button>
              </div>
            </div>
          ))}
          {photos.length < 8 && (
            <label className="w-20 h-24 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[var(--teal)] transition-colors">
              <span className="text-2xl text-gray-300">+</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
        </div>
        {uploading && <p className="text-xs text-[var(--teal)] tracking-wider">アップロード中...</p>}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="bg-[var(--teal)] text-white text-xs tracking-widest px-8 py-3 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60">
          {saving ? "保存中..." : isEdit ? "更新する" : "登録する"}
        </button>
        <button type="button" onClick={() => router.push("/admin/casts")}
          className="border border-gray-200 text-gray-500 text-xs tracking-widest px-6 py-3 hover:bg-gray-50 transition-colors">
          キャンセル
        </button>
      </div>
    </form>
  );
}
