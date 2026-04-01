import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SubscribeForm from "@/components/common/SubscribeForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "subscribe");
}

export default function SubscribePage() {
  return <SubscribeForm />;
}
