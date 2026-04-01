import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "reservation");
}

export default async function ReservationPage() {
  const locale = await getLocale();
  return <ReservationContent locale={locale} />;
}

function ReservationContent({ locale }: { locale: string }) {
  const t = useTranslations("reservation");
  const isForeign = locale !== "ja";

  const foreignInfo: Record<string, { title: string; items: { q: string; a: string }[] }> = {
    en: {
      title: "For International Visitors",
      items: [
        { q: "Is English support available?", a: "Yes. Our staff can communicate in English via LINE and WhatsApp. Please feel free to message us." },
        { q: "Can I book a hotel visit?", a: "Yes. We cover most major hotels in central Tokyo (Shinjuku, Shibuya, Roppongi, Ginza, etc.). Please provide your hotel name when booking." },
        { q: "What payment methods are accepted?", a: "Cash (JPY) is preferred. Please prepare the exact amount. Card payments are not available at this time." },
        { q: "How far in advance should I book?", a: "Same-day bookings are welcome. For your preferred cast member, we recommend booking 1–2 hours in advance." },
      ],
    },
    zh: {
      title: "外国游客须知",
      items: [
        { q: "支持中文服务吗？", a: "是的，我们可以通过LINE和WhatsApp提供中文支持，请随时联系我们。" },
        { q: "可以到酒店上门吗？", a: "可以，我们覆盖东京主要地区的酒店（新宿、涩谷、六本木、银座等）。预约时请提供酒店名称。" },
        { q: "支持哪些付款方式？", a: "仅接受现金（日元）。请提前准备好相应金额。目前不支持刷卡支付。" },
        { q: "提前多久预约比较好？", a: "欢迎当天预约。如需指定特定女性，建议提前1-2小时预约。" },
      ],
    },
    ko: {
      title: "외국인 방문객 안내",
      items: [
        { q: "한국어 지원이 가능한가요?", a: "네, LINE과 WhatsApp을 통해 한국어로 소통 가능합니다. 편하게 연락해 주세요." },
        { q: "호텔 방문 서비스가 가능한가요?", a: "네, 도쿄 주요 지역의 호텔을 커버합니다(신주쿠, 시부야, 롯폰기, 긴자 등). 예약 시 호텔명을 알려주세요." },
        { q: "결제 방법은 어떻게 되나요?", a: "현금(엔화)만 가능합니다. 정확한 금액을 미리 준비해 주세요. 카드 결제는 현재 지원하지 않습니다." },
        { q: "얼마나 미리 예약해야 하나요?", a: "당일 예약도 환영합니다. 원하는 여성이 있으시면 1-2시간 전에 예약하시길 권장합니다." },
      ],
    },
  };

  const faq = foreignInfo[locale];

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

      {/* Foreign visitor FAQ */}
      {isForeign && faq && (
        <section className="bg-[var(--teal-light)] py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl tracking-wider text-[var(--teal)] text-center mb-10">{faq.title}</h2>
            <div className="space-y-6">
              {faq.items.map((item, i) => (
                <div key={i} className="bg-white border border-[var(--border)] p-6">
                  <p className="text-sm font-medium text-gray-800 mb-2">Q. {item.q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
