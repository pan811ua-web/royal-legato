import { SITE_NAME, SITE_URL, SITE_TEL } from "@/lib/seo";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE_NAME,
    "url": SITE_URL,
    "telephone": SITE_TEL,
    "description": "東京の高級デリバリーヘルス。厳選されたキャストが最高のひとときをお届けします。",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "東京都",
      "addressCountry": "JP",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "10:00",
      "closes": "05:00",
    },
    "priceRange": "¥20,000〜",
    "image": `${SITE_URL}/images/ogp.jpg`,
    "sameAs": [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
