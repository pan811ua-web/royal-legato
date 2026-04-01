"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NewsActions({ newsId }: { newsId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("このニュースを削除しますか？")) return;
    const supabase = createClient();
    await supabase.from("news").delete().eq("id", newsId);
    router.refresh();
  };
  return (
    <div className="flex gap-3 justify-end">
      <Link href={`/admin/news/${newsId}`} className="text-[var(--teal)] text-xs tracking-widest hover:underline">編集</Link>
      <button onClick={handleDelete} className="text-red-400 text-xs tracking-widest hover:underline">削除</button>
    </div>
  );
}
