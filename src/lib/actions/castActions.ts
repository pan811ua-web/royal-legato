"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

type CastInput = {
  id?: string;
  name: string;
  age: number;
  height?: number | null;
  bust?: number | null;
  cup?: string | null;
  waist?: number | null;
  hip?: number | null;
  rank: string;
  status: string;
  new_badge: boolean;
  pr?: string | null;
  sort_order: number;
  tags: string[];
  photos: { id?: string; url: string; is_main: boolean }[];
};

export async function saveCast(input: CastInput): Promise<{ error?: string; id?: string }> {
  const supabase = createAdminClient();
  const isEdit = !!input.id;

  const castData = {
    name: input.name,
    age: input.age,
    height: input.height ?? null,
    bust: input.bust ?? null,
    cup: input.cup ?? null,
    waist: input.waist ?? null,
    hip: input.hip ?? null,
    rank: input.rank,
    status: input.status,
    new_badge: input.new_badge,
    pr: input.pr ?? null,
    sort_order: input.sort_order,
  };

  let castId = input.id;

  if (isEdit) {
    const { error } = await supabase.from("casts").update(castData).eq("id", castId!);
    if (error) return { error: error.message };
  } else {
    const { data, error } = await supabase.from("casts").insert(castData).select("id").single();
    if (error) return { error: error.message };
    castId = data.id;
  }

  // Tags: 削除して再登録
  await supabase.from("cast_tags").delete().eq("cast_id", castId!);
  if (input.tags.length > 0) {
    await supabase.from("cast_tags").insert(input.tags.map((tag) => ({ cast_id: castId, tag })));
  }

  // Photos: 新規のみ追加
  const newPhotos = input.photos.filter((p) => !p.id);
  if (newPhotos.length > 0) {
    await supabase.from("cast_photos").insert(
      newPhotos.map((p, i) => ({
        cast_id: castId,
        url: p.url,
        is_main: p.is_main,
        sort_order: input.photos.findIndex((ph) => ph.url === p.url),
      }))
    );
  }
  // is_main の更新
  for (const p of input.photos.filter((p) => p.id)) {
    await supabase.from("cast_photos").update({ is_main: p.is_main }).eq("id", p.id!);
  }

  revalidatePath("/admin/casts");
  revalidatePath("/ja/models");
  revalidatePath("/ja");
  return { id: castId };
}

export async function deleteCast(castId: string): Promise<{ error?: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("casts").delete().eq("id", castId);
  if (error) return { error: error.message };
  revalidatePath("/admin/casts");
  revalidatePath("/ja/models");
  return {};
}

export async function deleteCastPhoto(photoId: string, castId: string): Promise<{ error?: string }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("cast_photos").delete().eq("id", photoId);
  if (error) return { error: error.message };

  // 削除後、次の写真をメインに昇格
  const { data: remaining } = await supabase
    .from("cast_photos")
    .select("id")
    .eq("cast_id", castId)
    .order("sort_order")
    .limit(1);
  if (remaining && remaining.length > 0) {
    await supabase.from("cast_photos").update({ is_main: true }).eq("id", remaining[0].id);
  }
  return {};
}
