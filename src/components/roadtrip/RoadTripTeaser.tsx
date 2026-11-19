import Link from "next/link";
import { VideoBackdrop } from "./VideoBackdrop";
import { asset } from "@/lib/asset";

/** Section immersive de la homepage, juste après le hero : porte d'entrée vers Indiana Road Trip. */
export function RoadTripTeaser() {
  return (
    <section className="grain relative overflow-hidden bg-carbone text-sable" aria-labelledby="teaser-rt">
      <div className="relative min-h-[88svh]">
        <VideoBackdrop src={asset("/videos/route-normandie.mp4")} poster={asset("/images/roadtrip/route-normandie-poster.jpg")} label="Un motard roule sur une route de campagne normande" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbone/90 via-carbone/50 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 lg:px-8">
          <p className="font-display text-xl font-semibold text-sable/80">Indiana Road Trip</p>
          <h2 id="teaser-rt" className="font-editorial mt-2 max-w-4xl text-[clamp(3rem,7vw,6.4rem)] text-white">Prenez des vacances. Prenez le guidon.</h2>
          <p className="measure mt-5 text-lg text-sable/90">
            Deux semaines au Havre pour vous former au permis moto A2, avec hébergement, et la côte normande à découvrir entre deux leçons.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stage-moto-normandie/" className="btn btn-sunset">Découvrir le stage moto et séjour</Link>
            <Link href="/stage-moto-normandie/#sessions" className="btn btn-ghost btn-ghost-light text-white">Voir les prochaines sessions</Link>
          </div>
          <ul className="mt-10 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/20 pt-5 text-sm sm:text-base">
            <li><strong className="block font-display text-2xl text-white">14 jours</strong>sur place</li>
            <li><strong className="block font-display text-2xl text-white">Permis A2</strong>20 h de conduite</li>
            <li><strong className="block font-display text-2xl text-white">Hébergement</strong>inclus</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
