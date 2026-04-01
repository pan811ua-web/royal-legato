import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import RecruitForm from "@/components/common/RecruitForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "recruit");
}

export default function RecruitPage() {
  return <RecruitForm />;
}
