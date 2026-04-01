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
    home: "Royal Legato — Tokyo's #1 premium escort & delivery health service. English-speaking staff, hotel visits available, 24/7 service. LINE & WhatsApp reservations accepted.",
    concept: "Royal Legato Tokyo — luxury companion service where elegance meets intimacy. Handpicked bilingual cast, complete discretion, available at your hotel 24/7.",
    schedule: "Royal Legato Tokyo — today's available companions. Check real-time schedule and book your preferred cast member instantly.",
    reservation: "Book Royal Legato Tokyo now. English support available 24/7 via LINE, WhatsApp, or phone. Hotel visits across central Tokyo.",
    system: "Royal Legato Tokyo pricing guide. From ¥20,000/60min. Transparent rank-based pricing, no hidden fees. Credit cards & cash accepted.",
    models: "Royal Legato Tokyo companion gallery. Browse DIAMOND, PLATINUM, GOLD, and SILVER rank escorts. Profile photos, stats, and availability.",
    subscribe: "Join Royal Legato Tokyo newsletter — be first to hear about new companions, campaigns, and exclusive offers.",
    recruit: "Work with Royal Legato Tokyo. High income, flexible hours, daily pay. Beginners and experienced welcome. English support available.",
  },
  zh: {
    home: "Royal Legato — 东京顶级外送健康服务。精选女性、24小时服务、完全保密。可通过LINE预约。支持酒店上门服务。",
    concept: "Royal Legato东京——优雅与亲密相遇的地方。精心挑选的女性、完全隐私保护、24小时全天候服务。",
    schedule: "Royal Legato今日出勤信息。查看在籍女性的实时排班，立即预约您喜欢的女性。",
    reservation: "立即预约Royal Legato东京。24小时支持LINE、WhatsApp或电话预约。覆盖东京主要酒店。",
    system: "Royal Legato东京价格表。60分钟起¥20,000。透明的等级定价，无隐藏费用。",
    models: "Royal Legato东京女性一览。浏览DIAMOND、PLATINUM、GOLD、SILVER等级的精选女性。",
    subscribe: "订阅Royal Legato东京通讯——第一时间获得新人信息和优惠活动。",
    recruit: "加入Royal Legato东京。高收入、弹性工作时间、当日结算。欢迎新人。",
  },
  ko: {
    home: "Royal Legato — 도쿄 최고급 출장 서비스. 엄선된 여성진, 24시간 서비스, 완전 프라이버시 보장. LINE 예약 가능. 호텔 방문 서비스 지원.",
    concept: "Royal Legato 도쿄 — 우아함과 친밀함이 만나는 곳. 엄선된 캐스트, 완전한 개인정보 보호, 24시간 서비스.",
    schedule: "Royal Legato 오늘의 출근 정보. 재적 여성의 실시간 스케줄 확인 및 즉시 예약 가능.",
    reservation: "Royal Legato 도쿄 지금 예약하기. LINE, WhatsApp, 전화로 24시간 예약 가능. 도쿄 주요 호텔 방문 서비스.",
    system: "Royal Legato 도쿄 요금 안내. 60분 ¥20,000~. 투명한 등급별 요금, 숨겨진 비용 없음.",
    models: "Royal Legato 도쿄 여성 목록. DIAMOND, PLATINUM, GOLD, SILVER 등급의 엄선된 캐스트 프로필.",
    subscribe: "Royal Legato 도쿄 뉴스레터 구독 — 신인 정보와 캠페인을 가장 먼저 받아보세요.",
    recruit: "Royal Legato 도쿄에서 일해보세요. 고수입, 자유 출근, 당일 지급. 초보자 환영.",
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
    home: `${SITE_NAME} | Tokyo Premium Escort & Delivery Health Service`,
    concept: `About Us | ${SITE_NAME} Tokyo Luxury Companion`,
    schedule: `Today's Schedule | ${SITE_NAME} Tokyo`,
    reservation: `Book Now | ${SITE_NAME} Tokyo — English Support 24/7`,
    system: `Pricing & Courses | ${SITE_NAME} Tokyo`,
    models: `Companion Gallery | ${SITE_NAME} Tokyo`,
    subscribe: `Newsletter | ${SITE_NAME} Tokyo`,
    recruit: `Join Our Team | ${SITE_NAME} Tokyo`,
  },
  zh: {
    home: `${SITE_NAME} | 东京高级外送服务`,
    concept: `服务理念 | ${SITE_NAME} 东京`,
    schedule: `今日出勤 | ${SITE_NAME} 东京`,
    reservation: `立即预约 | ${SITE_NAME} 东京`,
    system: `价格体系 | ${SITE_NAME} 东京`,
    models: `在籍女性 | ${SITE_NAME} 东京`,
    subscribe: `订阅通讯 | ${SITE_NAME} 东京`,
    recruit: `招聘信息 | ${SITE_NAME} 东京`,
  },
  ko: {
    home: `${SITE_NAME} | 도쿄 최고급 출장 서비스`,
    concept: `서비스 소개 | ${SITE_NAME} 도쿄`,
    schedule: `오늘의 출근 | ${SITE_NAME} 도쿄`,
    reservation: `예약하기 | ${SITE_NAME} 도쿄`,
    system: `요금 안내 | ${SITE_NAME} 도쿄`,
    models: `재적 여성 | ${SITE_NAME} 도쿄`,
    subscribe: `뉴스레터 | ${SITE_NAME} 도쿄`,
    recruit: `채용 정보 | ${SITE_NAME} 도쿄`,
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
        "x-default": `${SITE_URL}/ja${page === "home" ? "" : `/${page}`}`,
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
