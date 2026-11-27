"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { journey, type StampId } from "@/lib/journey";
import { JourneyCta } from "./Journey";

type Card = { sign: string; title: string; text: string; stamp: StampId; media: { type: "image" | "video"; src: string; poster?: string; alt: string }; tint: string };

const CARDS: Card[] = [
  { sign: "", title: "Partir.", text: "Deux semaines loin du périph, face à la Manche. Le genre de pause dont on revient différent.", stamp: "aventure", media: { type: "image", src: "/images/roadtrip/etretat-couchant.jpg", alt: "Les falaises d'Étretat au coucher du soleil" }, tint: "from-[#3b2518]/80" },
  { sign: "+", title: "Apprendre à piloter.", text: "20 heures de formation A2 avec un moniteur, de la piste à la route, et l'examen visé en fin de séjour.", stamp: "permis", media: { type: "video", src: "/videos/plateau-circuit.mp4", poster: "/images/roadtrip/plateau-circuit-poster.jpg", alt: "Une moto évolue entre des plots sur une piste de formation" }, tint: "from-carbone/80" },
  { sign: "+", title: "Ne rien organiser.", text: "Planning, dossier d'inscription, logement en option : on s'occupe de tout. Vous arrivez avec votre sac.", stamp: "cle-en-main", media: { type: "image", src: "/images/roadtrip/hebergement-illustration.jpg", alt: "Un séjour lumineux ouvert sur la campagne normande" }, tint: "from-foret/85" },
  { sign: "+", title: "Découvrir la côte.", text: "Étretat, Honfleur, Deauville : vos fins de journée et votre dimanche sont à vous.", stamp: "decouverte", media: { type: "image", src: "/images/roadtrip/honfleur.jpg", alt: "Le Vieux Bassin de Honfleur" }, tint: "from-ocean/85" },
];

/** Cartes collantes qui s'empilent : chaque bénéfice s'ajoute au précédent, jusqu'au total. */
export function StackedReasons() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) journey.stamp((e.target as HTMLElement).dataset.s as StampId); }), { threshold: 0.6 });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const OFF = 76; // décalage entre cartes : on voit les titres précédents s'empiler
  return (
    <div className="relative">
      {CARDS.map((c, i) => (
        <div key={c.title} className="sticky h-[74svh] min-h-[440px] pb-6" style={{ top: `calc(7.5rem + ${i * OFF}px)` }}>
          <div ref={(el) => { refs.current[i] = el; }} data-s={c.stamp} className="relative h-full overflow-hidden rounded-[28px] bg-carbone shadow-[0_-18px_50px_-18px_rgba(0,0,0,.5)]">
            {c.media.type === "video" ? (
              <video className="absolute inset-0 h-full w-full object-cover" src={asset(c.media.src)} poster={c.media.poster ? asset(c.media.poster) : undefined} muted loop playsInline autoPlay preload="none" aria-label={c.media.alt} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="absolute inset-0 h-full w-full object-cover" src={asset(c.media.src)} alt={c.media.alt} loading="lazy" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-b ${c.tint} via-transparent to-black/50`} />
            <div className="absolute inset-x-0 top-0 flex h-[76px] items-center justify-between gap-4 px-6 text-white md:px-10">
              <p className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold leading-none">
                {c.sign && <span className="mr-2 text-sunset">{c.sign}</span>}{c.title}
              </p>
              <span className="shrink-0 rounded-full bg-black/30 px-3 py-1 text-sm font-medium backdrop-blur">{i + 1} / 4</span>
            </div>
            <p className="absolute inset-x-0 bottom-0 max-w-2xl p-6 text-lg text-white md:p-10 md:text-2xl md:leading-snug">{c.text}</p>
          </div>
        </div>
      ))}
      <div className="sticky flex h-[74svh] min-h-[440px] flex-col rounded-[28px] bg-sunset text-carbone" style={{ top: `calc(7.5rem + ${CARDS.length * OFF}px)` }}>
        <p className="flex h-[76px] items-center px-6 font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold leading-none md:px-10"><span className="mr-2">=</span>Votre stage moto en Normandie.</p>
        <div className="px-6 pb-8 md:px-10">
          <p className="max-w-xl text-lg md:text-xl">Une aventure, un permis en ligne de mire, zéro logistique, une région à découvrir. En deux semaines.</p>
          <JourneyCta className="btn mt-6 bg-carbone text-white hover:bg-black" />
        </div>
      </div>
      {/* laisse l'addition complète affichée un moment avant de poursuivre */}
      <div className="h-[35svh]" aria-hidden="true" />
    </div>
  );
}
