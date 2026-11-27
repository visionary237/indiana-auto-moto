import Link from "next/link";
import { VideoBackdrop } from "./VideoBackdrop";
import { asset } from "@/lib/asset";

/** Section immersive de la homepage, juste après le hero : porte d'entrée vers Indiana Road Trip. */
export function RoadTripTeaser() {
  return (
    <section className="grain relative overflow-hidden bg-carbone text-sable" aria-labelledby="teaser-rt">
      <div className="relative min-h-[70svh]">
        <VideoBackdrop src={asset("/videos/route-normandie.mp4")} poster={asset("/images/roadtrip/route-normandie-poster.jpg")} label="Un motard roule sur une route de campagne normande" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbone/90 via-carbone/50 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 lg:px-8">
          <p className="inline-flex self-start rounded-full bg-sunset px-3 py-1 text-sm font-semibold text-carbone">Nouveau : stage moto en Normandie</p>
          <h2 id="teaser-rt" className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] text-white">Mettez Paris dans le rétro.</h2>
          <p className="measure mt-5 text-lg text-sable/90">
            Deux semaines au Havre pour passer votre permis moto A2, avec la côte normande à découvrir entre deux leçons. Logement en option, tout est organisé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stage-moto-normandie/" className="btn btn-sunset" data-rev-strong>Prendre la route</Link>
          </div>
          <ul className="mt-10 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/20 pt-5 text-sm sm:text-base">
            <li><strong className="block font-display text-2xl text-white">14 jours</strong>sur place</li>
            <li><strong className="block font-display text-2xl text-white">Permis A2</strong>20 h de conduite</li>
            <li><strong className="block font-display text-2xl text-white">Logement</strong>en option</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
