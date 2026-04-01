import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Contact bar */}
      <div className="bg-[var(--teal)] py-8 text-center">
        <p className="font-serif text-2xl tracking-[0.2em] mb-1">Royal Legato</p>
        <p className="text-xs tracking-[0.3em] text-white/80 mb-4">PREMIUM DELIVERY HEALTH · TOKYO</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://line.me/R/ti/p/@royallegato" target="_blank" rel="noopener noreferrer"
            className="bg-white text-[var(--teal)] text-xs tracking-widest px-6 py-2 hover:bg-gray-100 transition-colors">
            LINE
          </a>
          <a href="https://wa.me/810000000000" target="_blank" rel="noopener noreferrer"
            className="bg-white text-[var(--teal)] text-xs tracking-widest px-6 py-2 hover:bg-gray-100 transition-colors">
            WhatsApp
          </a>
          <a href="tel:090-0000-0000"
            className="bg-white text-[var(--teal)] text-xs tracking-widest px-6 py-2 hover:bg-gray-100 transition-colors">
            TEL: 090-0000-0000
          </a>
        </div>
      </div>

      {/* Nav links */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-wrap justify-center gap-6 text-xs tracking-widest text-gray-400">
        {[
          { href: `/${locale}/concept`, label: "CONCEPT" },
          { href: `/${locale}/schedule`, label: "SCHEDULE" },
          { href: `/${locale}/system`, label: "SYSTEM" },
          { href: `/${locale}/models`, label: "MODELS" },
          { href: `/${locale}/subscribe`, label: "SUBSCRIBE" },
          { href: `/${locale}/recruit`, label: "RECRUIT" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-[var(--teal)] transition-colors">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-white/10 py-4 text-center text-[11px] text-gray-500 tracking-widest">
        <div className="flex justify-center gap-4 mb-2">
          <Link href={`/${locale}/privacy`} className="hover:text-[var(--teal)]">{t("privacy")}</Link>
          <Link href={`/${locale}/legal`} className="hover:text-[var(--teal)]">{t("legal")}</Link>
        </div>
        {t("copy")}
      </div>
    </footer>
  );
}
