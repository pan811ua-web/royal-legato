import type { Metadata } from "next";

export const SITE_NAME = "Royal Legato";
export const SITE_URL = "https://royal-legato.jp"; // 本番URLに変更
export const SITE_TEL = "090-0000-0000";
export const SITE_DESCRIPTION_JA =
  "東京の高級デリバリーヘルス Royal Legato。厳選された美女キャストが最高のひとときをお届けします。24時間対応・完全プライベート・LINE予約OK。";

const descriptions: Record<string, Record<string, string>> = {
  ja: {
    home: SITE_DESCRIPTION_JA,
    concept: "Royal Legatoのコンセプト。品格と官能が交わる場所。厳選キャスト・完全プライバシー・24時間対応の東京高級デリヘル。",
    schedule: "Royal Legato 本日の出勤情報。在籍キャストのスケジュールをご確認いただけます。",
    reservation: "Royal Legatoのご予約。LINE・WhatsApp・電話にて24時間受付中。東京高級デリバリーヘルス。",
    system: "Royal Legatoの料金システム。60分¥20,000〜。ランク別料金・コース一覧。東京高級デリヘル。",
    models: "Royal Legato 在籍女性一覧。DIAMOND・PLATINUM・GOLD・SILVERランクの厳選キャスト。",
    subscribe: "Royal Legatoのメルマガ登録。新人情報・キャンペーン情報をいち早くお届けします。",
    recruit: "Royal Legato 求人情報。高収入・日払い・完全自由出勤。未経験歓迎。東京デリヘル求人。",
  },
  en: {
    home: "Royal Legato — Tokyo's premier delivery health service. Carefully selected cast, 24/7 available, full privacy. LINE reservations accepted.",
    concept: "Royal Legato concept. Where grace meets desire. Handpicked cast, complete privacy, 24/7 service in Tokyo.",
    schedule: "Royal Legato today's schedule. Check which cast members are available today.",
    reservation: "Royal Legato reservations. Available 24/7 via LINE, WhatsApp, or phone.",
    system: "Royal Legato pricing. From ¥20,000/60min. Course and rank price list.",
    models: "Royal Legato models. Handpicked cast members ranked DIAMOND, PLATINUM, GOLD, SILVER.",
    subscribe: "Subscribe to Royal Legato newsletter for new cast and campaign updates.",
    recruit: "Royal Legato recruitment. High income, daily pay, flexible schedule. Beginners welcome.",
  },
};

export function getDescription(locale: string, page: string): string {
  return descriptions[locale]?.[page] ?? descriptions.ja[page] ?? SITE_DESCRIPTION_JA;
}

const titles: Record<string, Record<string, string>> = {
  ja: {
    home: `${SITE_NAME} | 東京高級デリバリーヘルス`,
    concept: `コンセプト | ${SITE_NAME}`,
    schedule: `出勤情報 | ${SITE_NAME}`,
    reservation: `ご予約 | ${SITE_NAME}`,
    system: `料金システム | ${SITE_NAME}`,
    models: `在籍女性 | ${SITE_NAME}`,
    subscribe: `メルマガ登録 | ${SITE_NAME}`,
    recruit: `求人情報 | ${SITE_NAME}`,
    privacy: `プライバシーポリシー | ${SITE_NAME}`,
    legal: `特定商取引法 | ${SITE_NAME}`,
  },
  en: {
    home: `${SITE_NAME} | Tokyo Premium Delivery Health`,
    concept: `Concept | ${SITE_NAME}`,
    schedule: `Schedule | ${SITE_NAME}`,
    reservation: `Reservation | ${SITE_NAME}`,
    system: `Pricing | ${SITE_NAME}`,
    models: `Models | ${SITE_NAME}`,
    subscribe: `Newsletter | ${SITE_NAME}`,
    recruit: `Recruit | ${SITE_NAME}`,
  },
};

export function getTitle(locale: string, page: string): string {
  return titles[locale]?.[page] ?? titles.ja[page] ?? SITE_NAME;
}

export function buildMetadata(locale: string, page: string, overrides?: Partial<Metadata>): Metadata {
  const title = getTitle(locale, page);
  const description = getDescription(locale, page);
  const url = `${SITE_URL}/${locale}${page === "home" ? "" : `/${page}`}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "ja": `${SITE_URL}/ja${page === "home" ? "" : `/${page}`}`,
        "en": `${SITE_URL}/en${page === "home" ? "" : `/${page}`}`,
        "zh": `${SITE_URL}/zh${page === "home" ? "" : `/${page}`}`,
        "ko": `${SITE_URL}/ko${page === "home" ? "" : `/${page}`}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "ja" ? "ja_JP" : locale === "zh" ? "zh_CN" : locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/ogp.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} | 東京高級デリバリーヘルス`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/ogp.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...overrides,
  };
}
