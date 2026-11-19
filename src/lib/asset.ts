/** Préfixe les fichiers de /public avec le basePath (GitHub Pages sert le site sous /<nom-du-dépôt>). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => (p.startsWith("/") && !p.startsWith("//") ? `${BASE_PATH}${p}` : p);
