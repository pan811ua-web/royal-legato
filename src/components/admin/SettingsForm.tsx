"use client";
import { useState } from "react";
import { updateSiteSettings } from "@/lib/actions/settingsActions";

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [phone, setPhone] = useState(settings.phone ?? "");
  const [hours, setHours] = useState(settings.business_hours ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const result = await updateSiteSettings({ phone, business_hours: hours });
    if (result.error) {
      setError(result.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-lg">
      <div className="bg-white border border-gray-100 p-6 flex flex-col gap-5">
        <div>
          <label className="text-xs tracking-widest text-gray-400 block mb-1">電話番号</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="090-0000-0000"
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]"
          />
        </div>
        <div>
          <label className="text-xs tracking-widest text-gray-400 block mb-1">営業時間</label>
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="10:00 〜 翌6:00"
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[var(--teal)]"
          />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--teal)] text-white text-xs tracking-widest px-8 py-3 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60"
          >
            {saving ? "保存中..." : "保存する"}
          </button>
          {saved && <span className="text-green-600 text-xs tracking-widest">✓ 保存しました</span>}
        </div>
      </div>
    </div>
  );
}
