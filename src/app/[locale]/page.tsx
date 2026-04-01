import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import SectionTitle from "@/components/common/SectionTitle";
import RankBadge from "@/components/common/RankBadge";
import CampaignSlider from "@/components/common/CampaignSlider";
import { buildMetadata } from "@/lib/seo";
import { getActiveCasts, getCastsWithTodaySchedule } from "@/lib/queries/casts";
import { getPublishedNews } from "@/lib/queries/news";
import { getPrices } from "@/lib/queries/prices";
import { getSiteSettings } from "@/lib/queries/settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "home");
}

type Cast = Awaited<ReturnType<typeof getActiveCasts>>[0];
type NewsItem = Awaited<ReturnType<typeof getPublishedNews>>[0];

function CastCardHome({ cast, locale, t }: {
  cast: Cast;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const mainPhoto = cast.cast_photos?.find((p: { is_main: boolean }) => p.is_main) ?? cast.cast_photos?.[0];
  return (
    <Link href={`/${locale}/models/${cast.id}`} className="group block bg-white border border-[var(--border)] hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] bg-[var(--teal-light)] overflow-hidden">
        {mainPhoto ? (
          <img src={mainPhoto.url} alt={cast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl text-[var(--teal)]/30 font-serif">{cast.name[0]}</span>
          </div>
        )}
        {cast.new_badge && (
          <span className="absolute top-2 left-2 bg-[var(--gold)] text-white text-[10px] tracking-widest px-2 py-0.5">NEW</span>
        )}
      </div>
      <div className="p-3 text-center">
        <div className="mb-1"><RankBadge rank={cast.rank} /></div>
        <p className="font-serif text-lg tracking-wider">{cast.name}</p>
        <p className="text-xs text-gray-500">{cast.age}{t("models.age")} / {cast.height}{t("models.height")}</p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const [casts, todayCasts, news, prices, settings] = await Promise.all([
    getActiveCasts(),
    getCastsWithTodaySchedule(),
    getPublishedNews(5),
    getPrices(),
    getSiteSettings(),
  ]);

  return <HomePageClient locale={locale} casts={casts} todayCasts={todayCasts} news={news} prices={prices} settings={settings} />;
}

function HomePageClient({ locale, casts, todayCasts, news, prices, settings }: {
  locale: string;
  casts: Cast[];
  todayCasts: Cast[];
  news: NewsItem[];
  prices: Awaited<ReturnType<typeof getPrices>>;
  settings: Record<string, string>;
}) {
  const t = useTranslations();
  const pickupCasts = casts.slice(0, 4);
  const previewCourses = prices.courses.slice(0, 3);

  return (
    <div>
      {/* Campaign Slider */}
      <CampaignSlider locale={locale} />

      {/* Business Hours & Tel */}
      <section className="bg-white border-b border-gray-100 py-6 text-center">
        <p className="text-base md:text-lg tracking-widest text-gray-700 mb-1">
          営業時間 <span className="font-serif text-[var(--teal)] text-xl md:text-2xl mx-2">{settings.business_hours ?? "10:00 〜 翌6:00"}</span>
        </p>
        <a href={`tel:${settings.phone ?? ""}`} className="inline-block font-serif text-2xl md:text-3xl tracking-widest text-gray-800 hover:text-[var(--teal)] transition-colors">
          TEL : {settings.phone ?? "090-0000-0000"}
        </a>
      </section>

      {/* Nav Buttons */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="grid grid-cols-4">
          {[
            { label: "ホーム", sub: "HOME", icon: "⊞", href: `/${locale}` },
            { label: "出勤情報", sub: "SCHEDULE", icon: "📅", href: `/${locale}/schedule` },
            { label: "料金システム", sub: "SYSTEM", icon: "¥", href: `/${locale}/system` },
            { label: "在籍女性", sub: "MODELS", icon: "👤", href: `/${locale}/models` },
            { label: "ご予約", sub: "RESERVATION", icon: "📞", href: `/${locale}/reservation` },
            { label: "新着情報", sub: "NEWS", icon: "📢", href: `/${locale}/schedule` },
            { label: "コンセプト", sub: "CONCEPT", icon: "✦", href: `/${locale}/concept` },
            { label: "求人情報", sub: "RECRUIT", icon: "👑", href: `/${locale}/recruit` },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-center gap-3 py-5 px-3 border-r border-b border-gray-100 last:border-r-0 hover:bg-white hover:shadow-sm transition-all group"
            >
              <span className="text-xl text-gray-400 group-hover:text-[var(--teal)] transition-colors w-6 text-center">{item.icon}</span>
              <div>
                <p className="text-sm tracking-wider text-gray-700 group-hover:text-[var(--teal)] transition-colors">{item.label}</p>
                <p className="text-[9px] tracking-widest text-gray-400">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pickup */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <SectionTitle en={t("home.pickupTitle")} ja={t("home.pickupSub")} />
        {pickupCasts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pickupCasts.map((cast) => (
              <CastCardHome key={cast.id} cast={cast} locale={locale} t={t} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 tracking-widest text-sm py-12">{t("models.noModels")}</p>
        )}
        <div className="text-center mt-8">
          <Link href={`/${locale}/models`}
            className="inline-block border border-[var(--teal)] text-[var(--teal)] text-xs tracking-widest px-10 py-3 hover:bg-[var(--teal)] hover:text-white transition-colors">
            {t("home.viewAll")}
          </Link>
        </div>
      </section>

      {/* Today's Schedule */}
      <section className="py-20 px-4 bg-[var(--teal-light)]">
        <div className="max-w-4xl mx-auto">
          <SectionTitle en={t("home.scheduleTitle")} ja={t("home.scheduleSub")} />
          {todayCasts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {todayCasts.slice(0, 4).map((cast) => {
                const sch = cast.schedules?.[0];
                return (
                  <Link key={cast.id} href={`/${locale}/models/${cast.id}`}
                    className="bg-white p-4 text-center border border-[var(--border)] hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-[var(--teal)]/10 mx-auto mb-2 overflow-hidden flex items-center justify-center">
                      {cast.cast_photos?.[0] ? (
                        <img src={cast.cast_photos[0].url} alt={cast.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-serif text-xl text-[var(--teal)]">{cast.name[0]}</span>
                      )}
                    </div>
                    <p className="font-serif text-sm tracking-wider mb-1">{cast.name}</p>
                    <p className="text-[10px] text-[var(--teal)] tracking-widest">
                      {sch?.status === "working" ? t("schedule.workingNow") : t("schedule.scheduled")}
                    </p>
                    {sch && <p className="text-xs text-gray-500 mt-1">{sch.start_time.slice(0,5)} 〜 {sch.end_time?.slice(0,5) ?? ""}</p>}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 tracking-widest text-sm py-12">{t("schedule.noSchedule")}</p>
          )}
          <div className="text-center mt-8">
            <Link href={`/${locale}/schedule`}
              className="inline-block border border-[var(--teal)] text-[var(--teal)] text-xs tracking-widest px-10 py-3 hover:bg-[var(--teal)] hover:text-white transition-colors">
              {t("home.scheduleTitle")} →
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <SectionTitle en={t("home.newsTitle")} ja={t("home.newsSub")} />
        {news.length > 0 ? (
          <div className="divide-y divide-[var(--border)]">
            {news.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                <span className="text-[10px] tracking-widest text-gray-400 mt-0.5 whitespace-nowrap">
                  {item.published_at ? new Date(item.published_at).toLocaleDateString("ja-JP") : ""}
                </span>
                <span className="text-[10px] bg-[var(--teal-light)] text-[var(--teal)] px-2 py-0.5 tracking-widest whitespace-nowrap">{item.category}</span>
                <p className="text-sm text-gray-700">{item.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-8">ニュースはまだありません</p>
        )}
      </section>

      {/* Price preview */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto">
          <SectionTitle en={t("home.priceTitle")} ja={t("home.priceSub")} light />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {previewCourses.map((c) => (
              <div key={c.id} className="border border-white/20 text-center py-6">
                <p className="text-xs tracking-widest text-gray-400 mb-2">{c.course_name}</p>
                <p className="font-serif text-2xl text-[var(--gold)]">¥{c.base_price.toLocaleString()}<span className="text-sm">〜</span></p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${locale}/system`}
              className="inline-block border border-[var(--gold)] text-[var(--gold)] text-xs tracking-widest px-10 py-3 hover:bg-[var(--gold)] hover:text-white transition-colors">
              {t("home.priceTitle")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Concept banner */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <div className="orn-divider max-w-xs mx-auto mb-8">
          <span className="text-[var(--gold)] text-lg">✦</span>
        </div>
        <p className="font-serif text-3xl md:text-4xl font-light text-[var(--teal)] tracking-wider mb-4">
          {t("concept.h1")}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">{t("concept.body1")}</p>
        <Link href={`/${locale}/concept`}
          className="inline-block border border-[var(--teal)] text-[var(--teal)] text-xs tracking-widest px-10 py-3 hover:bg-[var(--teal)] hover:text-white transition-colors">
          {t("nav.concept")} →
        </Link>
      </section>
    </div>
  );
}
