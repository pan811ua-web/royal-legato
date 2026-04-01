import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FixedContactBar from "@/components/layout/FixedContactBar";
import AgeVerificationGate from "@/components/common/AgeVerificationGate";
import { LocalBusinessJsonLd } from "@/components/common/JsonLd";
import { SITE_URL } from "@/lib/seo";
import { getSiteSettings } from "@/lib/queries/settings";

const locales = ["ja", "en", "zh", "ko"];

export const metadata: Metadata = {
  title: { default: "Royal Legato | 東京高級デリバリーヘルス", template: "%s | Royal Legato" },
  description: "東京の高級デリバリーヘルス Royal Legato。厳選されたキャストが最高のひとときをお届けします。24時間対応・LINE予約OK。",
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.ico" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Sans+JP:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        <LocalBusinessJsonLd />
        <NextIntlClientProvider messages={messages}>
          <AgeVerificationGate />
          <Header phone={settings.phone} />
          <main className="pb-16 lg:pb-0">{children}</main>
          <Footer />
          <FixedContactBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
