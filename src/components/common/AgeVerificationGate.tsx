"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AgeVerificationGate() {
  const t = useTranslations("ageGate");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("rl_av")) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white mx-4 max-w-sm w-full p-8 text-center shadow-2xl">
        <div className="text-[var(--teal)] font-serif text-2xl tracking-widest mb-2">Royal Legato</div>
        <div className="w-12 h-px bg-[var(--gold)] mx-auto mb-6" />
        <h2 className="text-lg font-semibold mb-3">{t("title")}</h2>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">{t("body")}</p>
        <button
          onClick={() => { localStorage.setItem("rl_av", "1"); setShow(false); }}
          className="block w-full bg-[var(--teal)] text-white py-3 mb-3 text-sm tracking-widest hover:bg-[var(--teal-dark)] transition-colors"
        >
          {t("yes")}
        </button>
        <button
          onClick={() => { window.location.href = "https://www.google.com"; }}
          className="block w-full border border-gray-300 text-gray-500 py-3 text-sm tracking-widest hover:bg-gray-50 transition-colors"
        >
          {t("no")}
        </button>
      </div>
    </div>
  );
}
