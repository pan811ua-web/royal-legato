import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import RankBadge from "@/components/common/RankBadge";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getCastById } from "@/lib/queries/casts";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const cast = await getCastById(id);
  if (!cast) return { title: SITE_NAME };
  const tags = cast.cast_tags?.map((t: { tag: string }) => t.tag) ?? [];
  const title = `${cast.name}（${cast.age}歳・${cast.rank}）| ${SITE_NAME}`;
  const description = `${cast.name}のプロフィール。${cast.age}歳・身長${cast.height}cm${tags.length ? `・${tags.join("・")}` : ""}。${(cast.pr ?? "").slice(0, 60)}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: `${SITE_URL}/${locale}/models/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/models/${id}`,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/images/ogp.jpg`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CastDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  const cast = await getCastById(id);
  if (!cast) notFound();
  return <CastDetailClient cast={cast} locale={locale} />;
}

function CastDetailClient({ cast, locale }: {
  cast: NonNullable<Awaited<ReturnType<typeof getCastById>>>;
  locale: string;
}) {
  const t = useTranslations("castDetail");
  const mainPhoto = cast.cast_photos?.find((p: { is_main: boolean }) => p.is_main) ?? cast.cast_photos?.[0];
  const tags = cast.cast_tags?.map((t: { tag: string }) => t.tag) ?? [];

  const specs = [
    ...(cast.age ? [{ label: t("age"), value: `${cast.age}歳` }] : []),
    ...(cast.height ? [{ label: t("height"), value: `${cast.height}cm` }] : []),
    ...(cast.bust ? [{ label: t("bust"), value: `${cast.bust}cm${cast.cup ? ` (${cast.cup}カップ)` : ""}` }] : []),
    ...(cast.waist ? [{ label: t("waist"), value: `${cast.waist}cm` }] : []),
    ...(cast.hip ? [{ label: t("hip"), value: `${cast.hip}cm` }] : []),
  ];

  return (
    <div>
      <div className="bg-[var(--teal-light)] py-3 px-4">
        <div className="max-w-5xl mx-auto text-xs text-gray-500 tracking-widest">
          <Link href={`/${locale}`} className="hover:text-[var(--teal)]">TOP</Link>
          {" / "}
          <Link href={`/${locale}/models`} className="hover:text-[var(--teal)]">MODELS</Link>
          {" / "}
          <span className="text-[var(--teal)]">{cast.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Photos */}
          <div>
            <div className="relative aspect-[3/4] bg-[var(--teal-light)] overflow-hidden mb-3">
              {mainPhoto ? (
                <img src={mainPhoto.url} alt={cast.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl text-[var(--teal)]/20 font-serif">{cast.name[0]}</span>
                </div>
              )}
              {cast.new_badge && (
                <span className="absolute top-4 left-4 bg-[var(--gold)] text-white text-[10px] tracking-widest px-3 py-1">NEW</span>
              )}
            </div>
            {/* Thumbnail strip */}
            {cast.cast_photos && cast.cast_photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {cast.cast_photos.map((p: { url: string; is_main: boolean }, i: number) => (
                  <img key={i} src={p.url} alt={`${cast.name} ${i + 1}`}
                    className="w-16 h-20 object-cover flex-shrink-0 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2"><RankBadge rank={cast.rank} /></div>
            <h1 className="font-serif text-4xl tracking-[0.2em] text-gray-900 mb-1">{cast.name}</h1>
            <div className="w-12 h-px bg-[var(--gold)] mb-6" />

            <table className="w-full text-sm mb-6">
              <tbody>
                {specs.map((s) => (
                  <tr key={s.label} className="border-b border-[var(--border)]">
                    <td className="py-2.5 text-[10px] tracking-widest text-gray-400 w-24">{s.label}</td>
                    <td className="py-2.5 text-gray-700">{s.value}</td>
                  </tr>
                ))}
                {tags.length > 0 && (
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2.5 text-[10px] tracking-widest text-gray-400">{t("tags")}</td>
                    <td className="py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] bg-[var(--teal-light)] text-[var(--teal)] px-2 py-0.5">{tag}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {cast.pr && (
              <div className="bg-[var(--teal-light)] p-4 mb-6 border-l-2 border-[var(--teal)]">
                <p className="text-sm text-gray-600 leading-relaxed">{cast.pr}</p>
              </div>
            )}

            <Link href={`/${locale}/reservation`}
              className="block w-full bg-[var(--teal)] text-white text-center text-xs tracking-widest py-4 hover:bg-[var(--teal-dark)] transition-colors mb-3">
              {t("reserveBtn")}
            </Link>
            <Link href={`/${locale}/models`}
              className="block w-full border border-gray-300 text-gray-500 text-center text-xs tracking-widest py-3 hover:border-[var(--teal)] hover:text-[var(--teal)] transition-colors">
              ← 在籍一覧へ戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
