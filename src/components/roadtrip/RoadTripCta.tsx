import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

/** CTA contextuel vers Indiana Road Trip, réutilisé sur les pages moto, accéléré et stages. */
export function RoadTripCta({ title = "Et si vous passiez votre permis moto en Normandie ?", text = "Deux semaines au Havre : formation A2 intensive, hébergement inclus et la côte à découvrir entre deux leçons." }: { title?: string; text?: string }) {
  return (
    <section className="bg-carbone text-sable">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="relative min-h-[300px]">
          <Image src={asset("/images/roadtrip/etretat-couchant.jpg")} alt="Les falaises d'Étretat et l'Aiguille au coucher du soleil" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="px-5 py-14 lg:px-14">
          <p className="font-display text-lg font-semibold text-sable/70">Indiana Road Trip</p>
          <h2 className="font-editorial mt-2 text-[clamp(2.4rem,4.5vw,4rem)] text-white">{title}</h2>
          <p className="measure mt-4 text-sable/85">{text}</p>
          <Link href="/stage-moto-normandie/" className="btn btn-sunset mt-8">Découvrir le stage moto et séjour</Link>
        </div>
      </div>
    </section>
  );
}
