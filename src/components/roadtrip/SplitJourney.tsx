"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Side = { kicker: string; title: string; text: string; media: { type: "video" | "image"; src: string; poster?: string; alt: string } };
const MOMENTS: { learn: Side; escape: Side }[] = [
  {
    learn: { kicker: "Le matin", title: "Sur la piste", text: "Maniabilité, équilibre, freinage : le plateau se travaille sur piste, jusqu'à six motos par séance.", media: { type: "video", src: asset("/videos/plateau-circuit.mp4"), poster: asset("/images/roadtrip/plateau-circuit-poster.jpg"), alt: "Une moto évolue entre les plots d'une piste de maniabilité" } },
    escape: { kicker: "L'après-midi", title: "Sur la côte", text: "Les falaises d'Étretat sont à une demi-heure de route. Vous y allez à votre rythme.", media: { type: "image", src: asset("/images/roadtrip/etretat-aerien.jpg"), alt: "Vue aérienne des falaises d'Étretat et de la mer turquoise" } },
  },
  {
    learn: { kicker: "Chaque jour", title: "Un moniteur à vos côtés", text: "Votre moniteur fait le point avec vous et ajuste le programme à votre progression.", media: { type: "video", src: asset("/videos/moniteur-eleve.mp4"), poster: asset("/images/roadtrip/moniteur-eleve-poster.jpg"), alt: "Un moniteur donne des conseils à une élève casquée devant une moto" } },
    escape: { kicker: "Le week-end", title: "Les ports et les villages", text: "Honfleur, le Vieux Bassin et ses façades, de l'autre côté du pont de Normandie.", media: { type: "image", src: asset("/images/roadtrip/honfleur.jpg"), alt: "Le Vieux Bassin de Honfleur et ses maisons colorées" } },
  },
  {
    learn: { kicker: "La deuxième semaine", title: "En circulation", text: "Ville, rocade, routes de campagne : les leçons vous emmènent sur des routes variées.", media: { type: "video", src: asset("/videos/route-normandie.mp4"), poster: asset("/images/roadtrip/route-normandie-poster.jpg"), alt: "Un motard roule sur une petite route de campagne normande" } },
    escape: { kicker: "En fin de journée", title: "La mer pour horizon", text: "Les planches de Deauville, la plage du Havre, un coucher de soleil sur la Manche.", media: { type: "image", src: asset("/images/roadtrip/deauville-planches.jpg"), alt: "Une promeneuse sur les planches de Deauville" } },
  },
];

function Media({ m, active }: { m: Side["media"]; active: boolean }) {
  return m.type === "video" ? (
    <video className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`} src={m.src} poster={m.poster} muted loop playsInline autoPlay preload="none" aria-label={m.alt} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} src={m.src} alt={m.alt} loading="lazy" />
  );
}

/** Scène 03 : un séjour, deux expériences. Les deux moitiés avancent ensemble au défilement. */
export function SplitJourney() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-carbone text-sable" aria-labelledby="scene-split">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 lg:px-8">
        <p className="font-display text-xl font-semibold text-sable/70">Un séjour, deux expériences</p>
        <h2 id="scene-split" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] text-white">Apprendre le matin. Explorer l'après-midi.</h2>
      </div>

      {/* Desktop : deux moitiés collantes, pilotées par les étapes invisibles */}
      <div className="relative hidden md:block">
        <div className="sticky top-0 grid h-screen grid-cols-2">
          {(["learn", "escape"] as const).map((side) => (
            <div key={side} className="relative overflow-hidden">
              {MOMENTS.map((m, i) => <Media key={i} m={m[side].media} active={active === i} />)}
              <div className={`absolute inset-0 ${side === "learn" ? "bg-gradient-to-t from-carbone via-carbone/30 to-transparent" : "bg-gradient-to-t from-foret via-foret/20 to-transparent"}`} />
              <div className="absolute inset-x-0 bottom-0 p-10 lg:p-14">
                <p className="font-display text-lg font-semibold text-sable/80">{side === "learn" ? "Formation" : "Découverte"}</p>
                {MOMENTS.map((m, i) => (
                  <div key={i} className={`transition-all duration-500 ${active === i ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-4 opacity-0"}`} aria-hidden={active !== i}>
                    <p className="mt-1 text-sable/80">{m[side].kicker}</p>
                    <h3 className="font-editorial text-[clamp(2.4rem,4vw,4rem)] text-white">{m[side].title}</h3>
                    <p className="measure mt-2 text-lg text-sable/90">{m[side].text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2" aria-hidden="true">
            {MOMENTS.map((_, i) => <span key={i} className={`h-10 w-1 rounded-full transition-colors ${active === i ? "bg-sunset" : "bg-white/30"}`} />)}
          </div>
        </div>
        <div className="-mt-[100vh]">
          {MOMENTS.map((_, i) => <div key={i} data-i={i} ref={(el) => { steps.current[i] = el; }} className="h-screen" />)}
        </div>
      </div>

      {/* Mobile : paires empilées */}
      <div className="space-y-10 px-5 pb-20 md:hidden">
        {MOMENTS.map((m, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            {(["learn", "escape"] as const).map((side) => (
              <div key={side} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Media m={m[side].media} active />
                <div className="absolute inset-0 bg-gradient-to-t from-carbone/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-xs text-sable/80">{m[side].kicker}</p>
                  <h3 className="font-editorial text-2xl text-white">{m[side].title}</h3>
                </div>
              </div>
            ))}
            <p className="col-span-2 text-sable/80">{m.learn.text} {m.escape.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
