import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("news").select("*").eq("id", id).single();
  if (!data) notFound();
  return <div><h1 className="text-xl font-semibold tracking-wider mb-6">ニュース編集</h1><NewsForm news={data} /></div>;
}
