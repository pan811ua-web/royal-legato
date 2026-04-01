import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/common/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { getPrices } from "@/lib/queries/prices";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "system");
}

const RANK_ORDER = ["DIAMOND", "PLATINUM", "GOLD", "SILVER"];

function fmt(n: number) {
  return `¥${n.toLocaleString()}`;
}

export default async function SystemPage() {
  const { courses, extras: rawExtras } = await getPrices();
  const extras = [...rawExtras].sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank));

  return <SystemPageClient courses={courses} extras={extras} />;
}

function SystemPageClient({
  courses,
  extras,
}: {
  courses: { id: string; course_name: string; duration_min: number; base_price: number; sort_order: number }[];
  extras: { rank: string; extra_price: number }[];
}) {
  const t = useTranslations("system");

  const rankLabels: Record<string, string> = {
    DIAMOND: `◆ ${t("rankDiamond")}`,
    PLATINUM: `◆ ${t("rankPlatinum")}`,
    GOLD: `◆ ${t("rankGold")}`,
    SILVER: `◆ ${t("rankSilver")}`,
  };

  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        {/* Base courses */}
        <SectionTitle en={t("baseCourse")} ja="基本コース" />
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--teal)] text-white">
                <th className="py-3 px-4 text-left tracking-widest text-xs font-normal">コース</th>
                <th className="py-3 px-4 text-right tracking-widest text-xs font-normal">基本料金</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-[var(--teal-light)]"}>
                  <td className="py-4 px-4 font-serif text-base tracking-wider">{c.course_name}</td>
                  <td className="py-4 px-4 text-right font-serif text-lg text-[var(--teal)]">{fmt(c.base_price)}<span className="text-xs text-gray-400">〜</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rank extras */}
        <SectionTitle en={t("rankExtra")} ja="ランク加算" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {extras.map((r) => (
            <div key={r.rank} className="border border-[var(--border)] p-6 text-center">
              <p className="text-[10px] tracking-widest text-gray-500 mb-2">{rankLabels[r.rank] ?? r.rank}</p>
              <p className="font-serif text-2xl text-[var(--gold)]">
                {r.extra_price === 0 ? "±0" : `+${fmt(r.extra_price)}`}
              </p>
            </div>
          ))}
        </div>

        {/* Price matrix */}
        <SectionTitle en="PRICE TABLE" ja="料金一覧" />
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-3 px-4 text-left tracking-widest text-xs font-normal">コース</th>
                {extras.map((r) => (
                  <th key={r.rank} className="py-3 px-4 text-right tracking-widest text-xs font-normal">{rankLabels[r.rank] ?? r.rank}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 tracking-wider text-gray-700">{c.course_name}</td>
                  {extras.map((r) => (
                    <td key={r.rank} className="py-3 px-4 text-right font-serif text-[var(--teal)]">
                      {fmt(c.base_price + r.extra_price)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-400 tracking-wider mb-8">{t("totalNote")}</p>

        <div className="bg-[var(--teal-light)] p-8 text-center">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">{t("otherTitle")}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>{t("other1")}</p>
            <p>{t("other2")}</p>
            <p>{t("other3")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
