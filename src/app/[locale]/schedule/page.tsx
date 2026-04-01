import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import RankBadge from "@/components/common/RankBadge";
import { buildMetadata } from "@/lib/seo";
import { getCastsByDate } from "@/lib/queries/casts";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "schedule");
}

type Cast = Awaited<ReturnType<typeof getCastsByDate>>[0];

export default async function SchedulePage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const locale = await getLocale();
  const { date } = await searchParams;
  const today = new Date().toISOString().split("T")[0];
  const selectedDate = date ?? today;
  const casts = await getCastsByDate(selectedDate);

  return <SchedulePageClient locale={locale} casts={casts} selectedDate={selectedDate} />;
}

function SchedulePageClient({ locale, casts, selectedDate }: {
  locale: string;
  casts: Cast[];
  selectedDate: string;
}) {
  const t = useTranslations("schedule");

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      {/* Date strip */}
      <div className="sticky top-[calc(2rem+64px)] z-10 bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {days.map((d, i) => {
              const dateStr = d.toISOString().split("T")[0];
              const label = d.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", weekday: "short" });
              return (
                <Link key={i} href={`/${locale}/schedule?date=${dateStr}`}
                  className={`flex flex-col items-center px-4 py-2 text-xs tracking-widest transition-colors min-w-[60px]
                    ${dateStr === selectedDate ? "bg-[var(--teal)] text-white" : "text-gray-500 hover:text-[var(--teal)] hover:bg-[var(--teal-light)]"}`}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Schedule list */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        {casts.length === 0 ? (
          <p className="text-center text-gray-400 tracking-widest text-sm py-16">{t("noSchedule")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {casts.map((cast) => {
              const sch = cast.schedules?.[0];
              const mainPhoto = cast.cast_photos?.find((p: { is_main: boolean }) => p.is_main) ?? cast.cast_photos?.[0];
              return (
                <Link key={cast.id} href={`/${locale}/models/${cast.id}`}
                  className="group bg-white border border-[var(--border)] hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-[var(--teal-light)] overflow-hidden">
                    {mainPhoto ? (
                      <img src={mainPhoto.url} alt={cast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl text-[var(--teal)]/30 font-serif">{cast.name[0]}</span>
                      </div>
                    )}
                    <span className={`absolute top-2 right-2 text-[9px] tracking-widest px-2 py-0.5 text-white ${sch?.status === "working" ? "bg-[var(--teal)]" : "bg-[var(--gold)]"}`}>
                      {sch?.status === "working" ? t("workingNow") : t("scheduled")}
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <div className="mb-1"><RankBadge rank={cast.rank} /></div>
                    <p className="font-serif text-base tracking-wider">{cast.name}</p>
                    {sch && <p className="text-xs text-[var(--teal)] mt-1 tracking-wider">{sch.start_time.slice(0,5)} 〜 {sch.end_time?.slice(0,5) ?? ""}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
