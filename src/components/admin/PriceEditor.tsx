"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Course = { id: string; course_name: string; duration_min: number; base_price: number; sort_order: number };
type Extra = { rank: string; extra_price: number };

const RANK_ORDER = ["DIAMOND", "PLATINUM", "GOLD", "SILVER"];

export default function PriceEditor({ courses: init, extras: initExtras }: { courses: Course[]; extras: Extra[] }) {
  const [courses, setCourses] = useState(init);
  const [extras, setExtras] = useState([...initExtras].sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank)));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    // Save courses: delete all and re-insert
    await supabase.from("price_courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (courses.length > 0) {
      await supabase.from("price_courses").insert(
        courses.map((c, i) => ({ course_name: c.course_name, duration_min: c.duration_min, base_price: c.base_price, sort_order: i + 1 }))
      );
    }
    // Save extras: update each rank
    for (const e of extras) {
      await supabase.from("price_rank_extras").update({ extra_price: e.extra_price }).eq("rank", e.rank);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), course_name: "", duration_min: 60, base_price: 0, sort_order: courses.length + 1 }]);
  };

  return (
    <div className="max-w-2xl">
      {/* Courses */}
      <div className="bg-white border border-gray-100 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm tracking-widest text-gray-500">基本コース</h2>
          <button onClick={addCourse} className="text-xs tracking-widest text-[var(--teal)] border border-[var(--teal)] px-3 py-1 hover:bg-[var(--teal-light)]">
            + 追加
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {courses.map((c, i) => (
            <div key={c.id} className="flex gap-3 items-center">
              <input value={c.course_name} onChange={(e) => setCourses(courses.map((x, j) => j === i ? { ...x, course_name: e.target.value } : x))}
                placeholder="コース名（例: 60分）"
                className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
              <input type="number" value={c.duration_min} onChange={(e) => setCourses(courses.map((x, j) => j === i ? { ...x, duration_min: Number(e.target.value) } : x))}
                placeholder="分"
                className="w-16 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
              <span className="text-xs text-gray-400">分</span>
              <input type="number" value={c.base_price} onChange={(e) => setCourses(courses.map((x, j) => j === i ? { ...x, base_price: Number(e.target.value) } : x))}
                placeholder="料金"
                className="w-24 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
              <span className="text-xs text-gray-400">円</span>
              <button onClick={() => setCourses(courses.filter((_, j) => j !== i))}
                className="text-red-400 text-xs hover:text-red-600">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Rank extras */}
      <div className="bg-white border border-gray-100 p-6 mb-4">
        <h2 className="text-sm tracking-widest text-gray-500 mb-4">ランク別加算料金</h2>
        <div className="flex flex-col gap-3">
          {extras.map((e, i) => (
            <div key={e.rank} className="flex items-center gap-4">
              <span className="text-xs tracking-widest text-gray-500 w-24">◆ {e.rank}</span>
              <input type="number" value={e.extra_price}
                onChange={(ev) => setExtras(extras.map((x, j) => j === i ? { ...x, extra_price: Number(ev.target.value) } : x))}
                className="w-28 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]" />
              <span className="text-xs text-gray-400">円</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving}
          className="bg-[var(--teal)] text-white text-xs tracking-widest px-8 py-3 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60">
          {saving ? "保存中..." : "保存する"}
        </button>
        {saved && <span className="text-green-600 text-xs tracking-widest">✓ 保存しました</span>}
      </div>
    </div>
  );
}
