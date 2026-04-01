import { createAdminClient } from "@/lib/supabase/admin";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const settings: Record<string, string> = Object.fromEntries(
    (data ?? []).map((r) => [r.key, r.value])
  );

  return (
    <div>
      <h1 className="text-lg tracking-widest text-gray-700 mb-6">サイト設定</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
