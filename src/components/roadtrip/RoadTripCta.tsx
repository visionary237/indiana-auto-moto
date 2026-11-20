import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

/** CTA contextuel vers Indiana Road Trip, réutilisé sur les pages moto, accéléré et stages. */
export function RoadTripCta({ title = "Et si vous passiez votre permis moto en deux semaines de stage ?", text = "Formation A2 intensive au Havre, hébergement en option, à 2 h 10 de Paris en train." }: { title?: string; text?: string }) {
  return (
    <section className="bg-carbone text-sable">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="relative min-h-[300px]">
          <Image src={asset("/images/roadtrip/etretat-couchant.jpg")} alt="Les falaises d'Étretat et l'Aiguille au coucher du soleil" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="px-5 py-14 lg:px-14">
          <p className="text-sm font-medium text-sable/70">Stage moto en Normandie</p>
          <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.8rem)] text-white">{title}</h2>
          <p className="measure mt-4 text-sable/85">{text}</p>
          <Link href="/stage-moto-normandie/" className="btn btn-sunset mt-8">Découvrir le stage</Link>
        </div>
      </div>
    </section>
  );
}
