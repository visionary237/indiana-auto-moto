"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MAP_FILTERS, type Destination, type Lieu } from "@/lib/roadtrip";

// Projection équirectangulaire simple, centrée sur l'estuaire de la Seine
const LNG0 = -0.17, LAT0 = 49.95, K = 1000, COS = Math.cos((49.5 * Math.PI) / 180);
const px = (lng: number, lat: number) => [(lng - LNG0) * K * COS, (LAT0 - lat) * K] as const;
const W = (1.02 - LNG0) * K * COS, H = (LAT0 - 49.12) * K;

// Trait de côte simplifié (lng, lat), du Tréport à Cabourg
const COAST: [number, number][] = [
  [1.1, 49.94], [0.95, 49.9], [0.8, 49.876], [0.71, 49.872], [0.6, 49.86], [0.47, 49.81], [0.37, 49.766], [0.31, 49.74], [0.2, 49.708],
  [0.16, 49.683], [0.11, 49.62], [0.07, 49.515], [0.09, 49.49], [0.12, 49.472], [0.2, 49.462], [0.3, 49.46], [0.42, 49.475], [0.5, 49.462],
  [0.45, 49.445], [0.33, 49.432], [0.235, 49.42], [0.13, 49.4], [0.08, 49.37], [0.06, 49.358], [-0.07, 49.3], [-0.17, 49.285],
];
const LAND = [...COAST, [-0.17, 49.1], [1.1, 49.1]] as [number, number][];
const toPath = (pts: [number, number][], close = false) => pts.map(([lng, lat], i) => `${i ? "L" : "M"}${px(lng, lat).map((v) => v.toFixed(1)).join(" ")}`).join(" ") + (close ? " Z" : "");
const SEINE: [number, number][] = [[0.5, 49.462], [0.62, 49.45], [0.75, 49.42], [0.86, 49.38], [1.02, 49.36]];
const ALBATRE: [number, number][] = COAST.slice(0, 12);
const SCHOOL = { lat: 49.4937, lng: 0.115 };

const CAT_COLOR: Record<string, string> = { plage: "#2b7c8f", patrimoine: "#e9dfcb", balade: "#7fb38a", activite: "#e46f37", restaurant: "#f2b56b", hebergement: "#c9a4ff", partenaire: "#ffd166" };

export function ExploreMap({ destinations, lieux }: { destinations: Destination[]; lieux: (Lieu & { partenaire?: boolean })[] }) {
  const [filters, setFilters] = useState<string[]>(["incontournable"]);
  const [selected, setSelected] = useState<string>("etretat");
  const dest = destinations.find((d) => d.id === selected)!;

  const visible = useMemo(
    () => lieux.filter((l) => filters.some((f) => (f === "incontournable" ? l.incontournable : f === "partenaire" ? l.partenaire : l.categorie === f))),
    [filters, lieux],
  );
  const empty = filters.filter((f) => !lieux.some((l) => (f === "partenaire" ? l.partenaire : f === "incontournable" ? l.incontournable : l.categorie === f)));
  const toggle = (id: string) => setFilters((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrer la carte">
          {MAP_FILTERS.map((f) => (
            <button key={f.id} type="button" className="rt-chip" aria-pressed={filters.includes(f.id)} onClick={() => toggle(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-ocean">
          <svg viewBox={`0 0 ${W.toFixed(0)} ${H.toFixed(0)}`} className="h-auto w-full" role="img" aria-label="Carte de la côte normande autour du Havre">
            <defs>
              <pattern id="waves" width="24" height="12" patternUnits="userSpaceOnUse"><path d="M0 6 Q6 2 12 6 T24 6" fill="none" stroke="#fff" strokeOpacity=".08" /></pattern>
            </defs>
            <rect width={W} height={H} fill="url(#waves)" />
            <path d={toPath(LAND, true)} fill="#1e3a2f" />
            <path d={toPath(ALBATRE)} fill="none" stroke="#f1ece2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
            <path d={toPath(SEINE)} fill="none" stroke="#2b7c8f" strokeWidth="5" strokeLinecap="round" />
            {(() => { const [cx, cy] = px(0.2, 49.22); return <ellipse cx={cx} cy={cy} rx="95" ry="55" fill="none" stroke="#e9dfcb" strokeOpacity=".5" strokeDasharray="6 6" />; })()}
            {(() => { const [x, y] = px(0.74, 49.58); return <text x={x} y={y} fill="#e9dfcb" fillOpacity=".6" fontSize="18" fontStyle="italic" fontFamily="Bricolage Grotesque Variable, sans-serif">Pays de Caux</text>; })()}
            {(() => { const [x, y] = px(0.36, 49.92); return <text x={x} y={y} fill="#e9dfcb" fillOpacity=".7" fontSize="20" fontStyle="italic" fontFamily="Bricolage Grotesque Variable, sans-serif">La Manche</text>; })()}

            {visible.map((l) => {
              const [x, y] = px(l.lng, l.lat);
              return <circle key={l.nom} cx={x} cy={y} r="6" fill={CAT_COLOR[l.partenaire ? "partenaire" : l.categorie] ?? "#fff"} stroke="#15171a" strokeWidth="2"><title>{l.nom}</title></circle>;
            })}

            {destinations.map((d) => {
              const [x, y] = px(d.lng, d.lat);
              const on = d.id === selected;
              const left = ["trouville", "deauville", "le-havre", "veules"].includes(d.id);
              return (
                <g key={d.id} role="button" tabIndex={0} aria-label={`Voir ${d.nom}`} aria-pressed={on} className="cursor-pointer focus:outline-none" onClick={() => setSelected(d.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(d.id))}>
                  <circle cx={x} cy={y} r={on ? 13 : 9} fill={on ? "#e46f37" : "#e9dfcb"} stroke="#15171a" strokeWidth="3" />
                  <text x={left ? x - 16 : x + 16} y={y + (d.id === "trouville" ? -10 : d.id === "deauville" ? 18 : 6)} textAnchor={left ? "end" : "start"} fill="#fff" fontSize={on ? 22 : 18} fontFamily="Bricolage Grotesque Variable, sans-serif" fontWeight="600" paintOrder="stroke" stroke="#15171a" strokeWidth="4">
                    {d.nom}
                  </text>
                </g>
              );
            })}
            {(() => { const [x, y] = px(SCHOOL.lng, SCHOOL.lat); return (
              <g aria-label="Indiana Auto-Moto"><circle cx={x} cy={y} r="8" fill="#d3271c" stroke="#fff" strokeWidth="3" /><text x={x + 14} y={y + 26} fill="#fff" fontSize="15" fontFamily="Geist Variable, sans-serif" fontWeight="600" paintOrder="stroke" stroke="#15171a" strokeWidth="4">Indiana</text></g>
            ); })()}
          </svg>
          <p className="absolute bottom-3 left-4 text-xs text-white/70">Carte schématique. Côte d'Albâtre en blanc.</p>
        </div>
        {empty.length > 0 && (
          <p className="mt-3 text-sm text-carbone/70" role="status">
            {empty.map((e) => MAP_FILTERS.find((f) => f.id === e)?.label).join(", ")} : adresses en cours de sélection. Aucune adresse n'est publiée sans l'accord de l'établissement.
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={dest.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="flex flex-col overflow-hidden rounded-2xl bg-white text-carbone">
          <div className="relative aspect-[16/10] bg-foret">
            {dest.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dest.image} alt={dest.nom} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="absolute inset-0 grid place-items-center p-6 text-center font-display text-4xl font-semibold text-sable/90">{dest.nom}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <p className="text-sm font-medium text-foret">{dest.distance}{dest.distance.startsWith("≈") ? " de l'école" : ""}</p>
            <h3 className="text-3xl md:text-4xl">{dest.nom}</h3>
            <p className="measure mt-3 text-carbone/80">{dest.texte}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <button key={d.id} type="button" onClick={() => setSelected(d.id)} className={`rounded-full px-3 py-1 text-sm font-semibold ${d.id === selected ? "bg-carbone text-white" : "bg-[#eef1ef] hover:bg-beton"}`}>{d.nom}</button>
              ))}
            </div>
            <p className="mt-auto pt-6 text-xs text-carbone/60">Distances approximatives par la route. Les visites et sorties sont libres et à votre charge.</p>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
