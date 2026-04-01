"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteCastButton({ castId, castName }: { castId: string; castName: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`「${castName}」を削除しますか？この操作は元に戻せません。`)) return;
    const supabase = createClient();
    await supabase.from("casts").delete().eq("id", castId);
    router.push("/admin/casts");
    router.refresh();
  };

  return (
    <button onClick={handleDelete}
      className="text-xs tracking-widest text-red-400 border border-red-200 px-4 py-2 hover:bg-red-50 transition-colors">
      削除
    </button>
  );
}
