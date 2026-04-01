"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "ダッシュボード", icon: "🏠" },
  { href: "/admin/casts", label: "キャスト管理", icon: "👤" },
  { href: "/admin/schedules", label: "出勤管理", icon: "📅" },
  { href: "/admin/news", label: "ニュース管理", icon: "📰" },
  { href: "/admin/prices", label: "料金管理", icon: "💴" },
  { href: "/admin/settings", label: "サイト設定", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-white/10">
        <p className="font-serif text-base tracking-[0.2em] text-[var(--teal)]">Royal Legato</p>
        <p className="text-[10px] tracking-widest text-gray-400 mt-0.5">ADMIN</p>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors
                ${active ? "bg-[var(--teal)] text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <span>{item.icon}</span>
              <span className="tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link href="/ja" target="_blank"
          className="block text-center text-[10px] tracking-widest text-gray-400 hover:text-white mb-3 transition-colors">
          ← サイトを見る
        </Link>
        <button onClick={handleLogout}
          className="w-full text-[10px] tracking-widest text-gray-500 hover:text-red-400 transition-colors">
          ログアウト
        </button>
      </div>
    </aside>
  );
}
