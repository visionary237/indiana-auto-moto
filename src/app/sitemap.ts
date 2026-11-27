import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

const paths = ["", "permis-auto/", "permis-moto/", "formations-accelerees/", "stages/", "equipe/", "tarifs-financements/", "faq/", "contact/", "stage-moto-normandie/", "permis-moto-accelere/", "guides/permis-moto-en-deux-semaines/", "guides/prix-stage-permis-moto-hebergement/", "guides/permis-moto-depuis-paris/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${SITE_URL}/${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
}
