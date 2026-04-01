import { createClient } from "@/lib/supabase/server";
import PriceEditor from "@/components/admin/PriceEditor";

export default async function AdminPricesPage() {
  const supabase = await createClient();
  const [coursesRes, extrasRes] = await Promise.all([
    supabase.from("price_courses").select("*").order("sort_order"),
    supabase.from("price_rank_extras").select("*"),
  ]);
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-wider mb-6">料金管理</h1>
      <PriceEditor courses={coursesRes.data ?? []} extras={extrasRes.data ?? []} />
    </div>
  );
}
