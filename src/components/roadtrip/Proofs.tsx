import { reviews, school, team } from "@/lib/content";

/**
 * Preuves : avis vérifiables, témoignages vidéo, moniteurs.
 * Chaque bloc s'affiche vide (« à venir ») tant que le contenu réel n'est pas fourni : rien n'est inventé.
 * Avis : src/lib/content.ts > reviews. Moniteurs : > team. Vidéos : TESTIMONIALS ci-dessous.
 */
const TESTIMONIALS: { prenom: string; ville: string; src: string; poster: string }[] = [];

export function Proofs() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[28px] bg-white p-6 md:p-8">
        <h3 className="text-xl">Les avis des élèves</h3>
        {reviews.length ? (
          <ul className="mt-4 space-y-4">{reviews.slice(0, 3).map((r) => <li key={r.author + r.date}><p aria-label={`${r.rating} sur 5`} className="text-sunset">{"★".repeat(r.rating)}</p><blockquote className="mt-1">{r.text}</blockquote><p className="mt-1 text-sm text-gris">{r.author}, avis {r.source}</p></li>)}</ul>
        ) : (
          <p className="mt-3 text-carbone/70">Nous publions uniquement des avis vérifiables, laissés sur des plateformes indépendantes. Les premiers stagiaires seront invités à témoigner.</p>
        )}
      </div>
      <div className="rounded-[28px] bg-white p-6 md:p-8">
        <h3 className="text-xl">Ils sont partis</h3>
        {TESTIMONIALS.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-3">{TESTIMONIALS.map((t) => <li key={t.src}><video src={t.src} poster={t.poster} controls preload="none" className="aspect-[9/16] w-full rounded-xl object-cover" /><p className="mt-1 text-sm">{t.prenom}, venu de {t.ville}</p></li>)}</ul>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => <div key={i} className="grid aspect-[9/16] place-items-center rounded-xl bg-[repeating-linear-gradient(135deg,#eef1ef_0_8px,#e4e8e6_8px_16px)]"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/80 text-carbone/60">▶</span></div>)}
            </div>
            <p className="mt-3 text-carbone/70">Témoignages vidéo des premiers stagiaires, tournés à la fin de leur séjour.</p>
          </>
        )}
      </div>
      <div className="rounded-[28px] bg-white p-6 md:p-8">
        <h3 className="text-xl">Vos moniteurs</h3>
        <ul className="mt-4 space-y-3">
          {team.filter((m) => !m.role.includes("Accueil")).map((m, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-beton text-xs text-gris">{m.placeholder ? "Photo" : ""}</span>
              <span><span className="block font-semibold">{m.placeholder ? "Portrait à venir" : m.name}</span><span className="text-sm text-carbone/65">{m.role}</span></span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-carbone/60">Enseignants diplômés d'État, au sein d'une école agréée (n° {school.agrement}).</p>
      </div>
    </div>
  );
}
