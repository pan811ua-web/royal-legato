import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CastForm from "@/components/admin/CastForm";
import DeleteCastButton from "@/components/admin/DeleteCastButton";

export default async function EditCastPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: cast } = await supabase
    .from("casts")
    .select("*, cast_tags(tag), cast_photos(id, url, is_main, sort_order)")
    .eq("id", id)
    .single();

  if (!cast) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold tracking-wider">{cast.name} — 編集</h1>
        <DeleteCastButton castId={id} castName={cast.name} />
      </div>
      <CastForm cast={cast} />
    </div>
  );
}
