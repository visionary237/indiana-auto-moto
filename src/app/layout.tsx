import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SoundFx } from "@/components/SoundFx";
import { JsonLd } from "@/components/ui";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Auto-école et moto-école au Havre | Indiana Auto-Moto", template: "%s | Indiana Auto-Moto, Le Havre" },
  description:
    "Indiana Auto-Moto, l'école des motards au Havre : permis B, conduite accompagnée, permis moto A1, A2, maxi scooter, stages et formations accélérées. CPF accepté.",
  formatDetection: { telephone: true },
  // Environnement de test (GitHub Pages) : non indexé tant que le domaine officiel n'est pas branché.
  robots: process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#1d2125" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-asphalt focus:px-4 focus:py-2 focus:text-marquage">
          Aller au contenu
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <SoundFx />
      </body>
    </html>
  );
}
