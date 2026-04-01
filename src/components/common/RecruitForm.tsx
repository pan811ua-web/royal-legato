"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RecruitPage() {
  const t = useTranslations("recruit");
  const [form, setForm] = useState({ name: "", age: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const features = [
    { label: t("feature1"), icon: "💰" },
    { label: t("feature2"), icon: "📅" },
    { label: t("feature3"), icon: "💆" },
  ];

  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <p className="text-center text-sm text-gray-500 tracking-wider mb-12">{t("lead")}</p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((f) => (
            <div key={f.label} className="bg-[var(--teal-light)] p-8 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <p className="text-sm tracking-wider text-gray-700">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border border-[var(--border)] p-8">
          <h2 className="font-serif text-xl tracking-wider text-[var(--teal)] mb-6 text-center">{t("formTitle")}</h2>

          {status === "success" ? (
            <div className="bg-[var(--teal-light)] text-[var(--teal)] py-8 px-6 text-center tracking-wider text-sm">
              {t("success")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                placeholder={t("namePlaceholder")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--teal)]"
              />
              <input
                type="number"
                placeholder={t("agePlaceholder")}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--teal)]"
              />
              <input
                required
                placeholder={t("phonePlaceholder")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--teal)]"
              />
              <textarea
                rows={4}
                placeholder={t("messagePlaceholder")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--teal)] resize-none"
              />
              {status === "error" && (
                <p className="text-red-500 text-xs tracking-wider">{t("error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[var(--teal)] text-white text-xs tracking-[0.3em] py-4 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60 mt-2">
                {status === "loading" ? "..." : t("submit")}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed">
          応募内容は厳重に管理し、採用目的以外には使用しません。<br />
          LINEやお電話でのご相談も歓迎です。
        </p>
      </section>
    </div>
  );
}
