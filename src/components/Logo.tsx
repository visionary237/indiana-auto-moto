/** Wordmark provisoire. Remplacer par le fichier vectoriel officiel du logo (casque) fourni par l'école. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Indiana Auto-Moto, l'école des motards">
      <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 3C10 3 4 10.5 4 20v8.5c0 4.7 3.8 8.5 8.5 8.5H30a6 6 0 0 0 6-6V20C36 10.5 30 3 20 3Z" fill="currentColor" className={light ? "text-marquage" : "text-asphalt"} />
        <path d="M13 17h21v7.5a2.5 2.5 0 0 1-2.5 2.5H17a4 4 0 0 1-4-4v-6Z" fill="#d3271c" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.45rem] font-extrabold tracking-tight ${light ? "text-marquage" : "text-asphalt"}`}>Indiana Auto-Moto</span>
        <span className="block font-display text-[.95rem] font-semibold text-rouge">L'école des motards au Havre</span>
      </span>
    </span>
  );
}
