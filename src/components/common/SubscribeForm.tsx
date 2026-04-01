"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SubscribePage() {
  const t = useTranslations("subscribe");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      <section className="py-20 px-4 max-w-lg mx-auto text-center">
        <div className="orn-divider max-w-xs mx-auto mb-8">
          <span className="text-[var(--gold)]">✦</span>
        </div>
        <p className="text-sm text-gray-500 tracking-wider mb-10 leading-relaxed">{t("lead")}</p>

        {status === "success" ? (
          <div className="bg-[var(--teal-light)] text-[var(--teal)] py-8 px-6 tracking-wider text-sm">
            {t("success")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="border border-[var(--border)] px-4 py-3 text-sm tracking-wider focus:outline-none focus:border-[var(--teal)] w-full"
            />
            {status === "error" && (
              <p className="text-red-500 text-xs tracking-wider">{t("error")}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[var(--teal)] text-white text-xs tracking-[0.3em] py-4 hover:bg-[var(--teal-dark)] transition-colors disabled:opacity-60">
              {status === "loading" ? "..." : t("submit")}
            </button>
          </form>
        )}

        <p className="mt-8 text-[10px] text-gray-400 leading-relaxed">
          ご登録いただいたメールアドレスは、メルマガ配信のみに使用します。<br />
          いつでも配信停止できます。
        </p>
      </section>
    </div>
  );
}
