import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/common/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "concept");
}

export default function ConceptPage() {
  const t = useTranslations("concept");

  const features = [
    { title: t("feature1Title"), body: t("feature1Body"), icon: "✦" },
    { title: t("feature2Title"), body: t("feature2Body"), icon: "✦" },
    { title: t("feature3Title"), body: t("feature3Body"), icon: "✦" },
  ];

  return (
    <div>
      {/* Page hero */}
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 mb-2">{t("sub")}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.25em]">{t("title")}</h1>
      </div>

      {/* Main content */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <div className="orn-divider max-w-xs mx-auto mb-10">
          <span className="text-[var(--gold)] text-xl">✦</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-[var(--teal)] tracking-wider mb-10">{t("h1")}</h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">{t("body1")}</p>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">{t("body2")}</p>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{t("body3")}</p>
      </section>

      {/* Features */}
      <section className="bg-[var(--teal-light)] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle en="FEATURES" ja="特徴" />
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-8 text-center shadow-sm">
                <div className="text-[var(--gold)] text-2xl mb-4">{f.icon}</div>
                <h3 className="font-serif text-lg tracking-wider text-[var(--teal)] mb-3">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand quote */}
      <section className="py-20 px-4 max-w-2xl mx-auto text-center">
        <blockquote className="border-l-2 border-[var(--gold)] pl-8 text-left">
          <p className="font-serif text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic mb-4">
            "Legato — smoothly connected, deeply felt."
          </p>
          <cite className="text-xs tracking-widest text-gray-400">— Royal Legato</cite>
        </blockquote>
      </section>
    </div>
  );
}
