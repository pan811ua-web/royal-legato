"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const LOCALES = ["ja", "en", "zh", "ko"] as const;

export default function Header({ phone = "090-0000-0000" }: { phone?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/concept`, label: t("concept") },
    { href: `/${locale}/schedule`, label: t("schedule") },
    { href: `/${locale}/reservation`, label: t("reservation") },
    { href: `/${locale}/system`, label: t("system") },
    { href: `/${locale}/models`, label: t("models") },
    { href: `/${locale}/subscribe`, label: t("subscribe") },
    { href: `/${locale}/recruit`, label: t("recruit") },
  ];

  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || "/";
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--teal)] text-white text-center text-[10px] tracking-[0.3em] py-1.5">
        PREMIUM DELIVERY HEALTH · TOKYO · 24H
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="font-serif text-xl tracking-[0.2em] text-[var(--teal)]">
            Royal Legato
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-widest transition-colors hover:text-[var(--teal)] ${
                  pathname.startsWith(item.href) ? "text-[var(--teal)] border-b border-[var(--teal)]" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: lang + tel + hamburger */}
          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="hidden md:flex gap-1">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={switchLocalePath(l)}
                  className={`text-[10px] px-1.5 py-0.5 tracking-widest transition-colors ${
                    l === locale
                      ? "bg-[var(--teal)] text-white"
                      : "text-gray-400 hover:text-[var(--teal)]"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Tel button */}
            <a
              href={`tel:${phone}`}
              className="hidden md:block text-[10px] tracking-widest text-[var(--teal)] border border-[var(--teal)] px-3 py-1.5 hover:bg-[var(--teal)] hover:text-white transition-colors"
            >
              {phone}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="メニュー"
            >
              <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-[calc(2rem+64px)]" onClick={() => setMenuOpen(false)}>
          <nav className="flex flex-col items-center gap-8 py-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.3em] text-gray-700 hover:text-[var(--teal)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={switchLocalePath(l)}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs px-2 py-1 tracking-widest ${l === locale ? "bg-[var(--teal)] text-white" : "text-gray-400 border border-gray-200"}`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <a href={`tel:${phone}`} className="mt-2 text-[var(--teal)] text-sm tracking-widest">
              {phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
