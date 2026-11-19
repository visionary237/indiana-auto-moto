"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { school } from "@/lib/content";
import { asset } from "@/lib/asset";

const lines = ["Le permis auto et moto,", "appris au Havre", "avec l'école des motards."];

export function HeroIntro() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section className="relative overflow-hidden bg-beton">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-0 pt-12 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:pt-20">
        <div className="pb-14 lg:pb-24">
          <h1 className="text-[clamp(3rem,7.2vw,6.4rem)] leading-[0.95]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="measure mt-7 text-lg md:text-xl text-asphalt/80"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Permis B, conduite accompagnée, A1, A2, maxi scooter, stages et formations accélérées. Leçons du lundi au samedi,
            de 8h à 20h, à quelques minutes du centre-ville.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
            <Link href="/contact/" className="btn btn-rouge">S'inscrire au permis</Link>
            <Link href="/tarifs-financements/" className="btn btn-ghost">Voir les tarifs</Link>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <Link href="/stage-moto-normandie/" className="group mt-6 inline-flex items-center gap-3 rounded-full bg-foret py-2 pl-2 pr-5 text-sable hover:bg-foret-light">
              <span className="rounded-full bg-sunset px-3 py-1 font-display text-sm font-bold text-carbone">Nouveau</span>
              <span className="font-semibold">Stage moto et séjour en Normandie</span>
            </Link>
          </motion.div>
          <ul className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-[.98rem]">
            <li><strong className="block font-display text-xl">CPF accepté</strong><span className="text-asphalt/65">auto, moto, accéléré, sous conditions</span></li>
            <li><strong className="block font-display text-xl">1 h offerte</strong><span className="text-asphalt/65">pour chaque élève parrainé</span></li>
            <li><strong className="block font-display text-xl">Agrément {school.agrement}</strong><span className="text-asphalt/65">école agréée par la préfecture</span></li>
            <li><strong className="block font-display text-xl">Qualiopi</strong><span className="text-asphalt/65">organisme de formation certifié</span></li>
          </ul>
        </div>

        <motion.div
          className="relative min-h-[340px] lg:min-h-0"
          initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <Image src={asset("/images/piste-moto.jpg")} alt="Élève motard en slalom entre des plots sur une piste de maniabilité" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute bottom-6 left-6 max-w-[16rem] rounded bg-marquage p-4 shadow-lg">
            <p className="font-display text-xl font-bold">Nouveau dans la flotte</p>
            <p className="text-sm text-asphalt/75">Vos leçons moto se font aussi sur une Yamaha MT-03.</p>
          </div>
        </motion.div>
      </div>
      <div className="lane text-asphalt" aria-hidden="true" />
    </section>
  );
}
