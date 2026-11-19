import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages : le workflow définit NEXT_PUBLIC_BASE_PATH="/<nom-du-dépôt>". Vide en local ou avec un domaine personnalisé.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
