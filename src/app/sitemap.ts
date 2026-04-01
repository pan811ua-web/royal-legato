import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const locales = ["ja", "en", "zh", "ko"];
const pages = ["", "/concept", "/schedule", "/reservation", "/system", "/models", "/subscribe", "/recruit"];

// TODO: Replace with Supabase cast IDs
const castIds = ["1", "2", "3", "4", "5", "6"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" || page === "/schedule" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page === "/models" ? 0.9 : 0.7,
      });
    }
    for (const id of castIds) {
      entries.push({
        url: `${SITE_URL}/${locale}/models/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
