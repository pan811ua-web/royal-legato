import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "reservation");
}

export default function ReservationPage() {
  const t = useTranslations("reservation");

  return (
    <div>
      {/* Hero */}
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      <section className="py-20 px-4 max-w-2xl mx-auto">
        <p className="text-center text-sm text-gray-500 tracking-wider mb-12">{t("lead")}</p>

        <div className="space-y-6">
          {/* LINE */}
          <a href="https://line.me/R/ti/p/@royallegato" target="_blank" rel="noopener noreferrer"
            className="block border border-[var(--border)] p-6 hover:border-[var(--teal)] hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06C755] text-white flex items-center justify-center text-xl flex-shrink-0">💬</div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{t("lineLead")}</p>
                <p className="font-serif text-xl text-[var(--teal)] tracking-wider group-hover:text-[var(--teal-dark)]">LINE</p>
                <p className="text-xs text-gray-400 mt-0.5">@royallegato</p>
              </div>
              <span className="ml-auto text-[var(--teal)] text-xl">→</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/810000000000" target="_blank" rel="noopener noreferrer"
            className="block border border-[var(--border)] p-6 hover:border-[var(--teal)] hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#25D366] text-white flex items-center justify-center text-xl flex-shrink-0">📱</div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{t("wpLead")}</p>
                <p className="font-serif text-xl text-[var(--teal)] tracking-wider group-hover:text-[var(--teal-dark)]">WhatsApp</p>
                <p className="text-xs text-gray-400 mt-0.5">+81-0000-0000-0000</p>
              </div>
              <span className="ml-auto text-[var(--teal)] text-xl">→</span>
            </div>
          </a>

          {/* TEL */}
          <a href="tel:090-0000-0000"
            className="block border border-[var(--border)] p-6 hover:border-[var(--teal)] hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--teal)] text-white flex items-center justify-center text-xl flex-shrink-0">📞</div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{t("telLead")}</p>
                <p className="font-serif text-xl text-[var(--teal)] tracking-wider group-hover:text-[var(--teal-dark)]">090-0000-0000</p>
                <p className="text-xs text-gray-400 mt-0.5">{t("telNote")}</p>
              </div>
              <span className="ml-auto text-[var(--teal)] text-xl">→</span>
            </div>
          </a>
        </div>

        {/* Note */}
        <div className="mt-12 border-t border-[var(--border)] pt-8 text-center">
          <div className="orn-divider max-w-xs mx-auto mb-6">
            <span className="text-[var(--gold)]">✦</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            ご予約はLINEが最もスムーズです。<br />
            キャストのご指名、エリア、ご希望のコースをお伝えください。
          </p>
        </div>
      </section>
    </div>
  );
}
