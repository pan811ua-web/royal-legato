import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import SectionTitle from "@/components/common/SectionTitle";
import RankBadge from "@/components/common/RankBadge";
import { buildMetadata } from "@/lib/seo";
import { getActiveCasts } from "@/lib/queries/casts";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "models");
}

type Cast = Awaited<ReturnType<typeof getActiveCasts>>[0];

export default async function ModelsPage({ searchParams }: { searchParams: Promise<{ rank?: string }> }) {
  const locale = await getLocale();
  const { rank } = await searchParams;
  const allCasts = await getActiveCasts();
  const casts = rank && rank !== "ALL" ? allCasts.filter((c) => c.rank === rank) : allCasts;

  return <ModelsPageClient locale={locale} casts={casts} selectedRank={rank ?? "ALL"} />;
}

function ModelsPageClient({ locale, casts, selectedRank }: {
  locale: string;
  casts: Cast[];
  selectedRank: string;
}) {
  const t = useTranslations("models");
  const ranks = ["ALL", "DIAMOND", "PLATINUM", "GOLD", "SILVER"];

  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* Rank filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {ranks.map((r) => (
            <Link key={r} href={r === "ALL" ? `/${locale}/models` : `/${locale}/models?rank=${r}`}
              className={`text-[10px] tracking-widest px-4 py-1.5 border transition-colors
                ${r === selectedRank || (r === "ALL" && selectedRank === "ALL")
                  ? "bg-[var(--teal)] text-white border-[var(--teal)]"
                  : "border-gray-300 text-gray-500 hover:border-[var(--teal)] hover:text-[var(--teal)]"}`}>
              {r === "ALL" ? t("filterAll") : `◆ ${r}`}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {casts.length === 0 ? (
          <p className="text-center text-gray-400 tracking-widest text-sm py-16">{t("noModels")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {casts.map((cast) => {
              const mainPhoto = cast.cast_photos?.find((p: { is_main: boolean }) => p.is_main) ?? cast.cast_photos?.[0];
              const tags = cast.cast_tags?.map((t: { tag: string }) => t.tag) ?? [];
              return (
                <Link key={cast.id} href={`/${locale}/models/${cast.id}`}
                  className="group bg-white border border-[var(--border)] hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-[var(--teal-light)] overflow-hidden">
                    {mainPhoto ? (
                      <img src={mainPhoto.url} alt={cast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl text-[var(--teal)]/20 font-serif">{cast.name[0]}</span>
                      </div>
                    )}
                    {cast.new_badge && (
                      <span className="absolute top-2 left-2 bg-[var(--gold)] text-white text-[9px] tracking-widest px-2 py-0.5">NEW</span>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <div className="mb-1.5"><RankBadge rank={cast.rank} /></div>
                    <p className="font-serif text-base tracking-wider mb-0.5">{cast.name}</p>
                    <p className="text-xs text-gray-500">{cast.age}{t("age")} / {cast.height}{t("height")}</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[9px] bg-[var(--teal-light)] text-[var(--teal)] px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
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
