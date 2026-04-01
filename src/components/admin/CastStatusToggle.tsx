"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const statuses = [
  { value: "active", label: "在籍中", color: "bg-green-100 text-green-700" },
  { value: "pause", label: "休憩中", color: "bg-yellow-100 text-yellow-700" },
  { value: "hidden", label: "非表示", color: "bg-gray-100 text-gray-500" },
];

export default function CastStatusToggle({ castId, currentStatus }: { castId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("casts").update({ status: newStatus }).eq("id", castId);
    setStatus(newStatus);
    setLoading(false);
    router.refresh();
  };

  const current = statuses.find((s) => s.value === status) ?? statuses[0];

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className={`text-[10px] tracking-widest px-2 py-1 border-0 cursor-pointer ${current.color} disabled:opacity-60`}
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
