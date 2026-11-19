"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const CONES = [140, 300, 460, 620, 780, 940, 1100];
// Trajectoire de slalom entre les plots, puis freinage en ligne droite
const PATH =
  "M20 150 C 80 150, 100 70, 140 70 S 220 230, 300 230 S 380 70, 460 70 S 540 230, 620 230 S 700 70, 780 70 S 860 230, 940 230 S 1020 70, 1100 70 S 1180 150, 1250 150";

/** Le moment fort du site : une moto suit le slalom du plateau au rythme du défilement. */
export function TrackSlalom() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trail = svg.querySelector<SVGPathElement>("#trail")!;
    const moto = svg.querySelector<SVGGElement>("#moto")!;
    const len = trail.getTotalLength();

    if (reduce) {
      const end = trail.getPointAtLength(len);
      moto.setAttribute("transform", `translate(${end.x} ${end.y})`);
      return;
    }

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const ctx = gsap.context(() => {
      gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 30%", scrub: 0.6 },
      });
      tl.to(trail, { strokeDashoffset: 0, ease: "none" }, 0).to(
        moto,
        { motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true }, ease: "none" },
        0,
      );
      svg.querySelectorAll(".cone").forEach((cone, i) => {
        tl.fromTo(cone, { scale: 0.6, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.05 }, (i + 0.5) / CONES.length - 0.08);
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={root} viewBox="0 0 1270 300" className="h-auto w-full" role="img" aria-label="Schéma d'un exercice de slalom moto entre sept plots sur la piste">
      <rect x="0" y="0" width="1270" height="300" rx="6" fill="#2a2f34" />
      {/* lignes de rive */}
      <line x1="0" y1="18" x2="1270" y2="18" stroke="#f7f7f4" strokeOpacity=".35" strokeWidth="3" />
      <line x1="0" y1="282" x2="1270" y2="282" stroke="#f7f7f4" strokeOpacity=".35" strokeWidth="3" />
      <line x1="0" y1="150" x2="1270" y2="150" stroke="#f7f7f4" strokeOpacity=".18" strokeWidth="4" strokeDasharray="36 28" />
      {/* zone de freinage */}
      <rect x="1180" y="110" width="8" height="80" fill="#f7f7f4" fillOpacity=".5" />
      <path id="trail" d={PATH} fill="none" stroke="#d3271c" strokeWidth="5" strokeLinecap="round" />
      {CONES.map((x, i) => (
        <g key={x} className="cone" transform={`translate(${x} ${i % 2 ? 150 : 150})`}>
          <path d="M-11 12 L0 -16 L11 12 Z" fill="#f26a1b" />
          <rect x="-7" y="-4" width="14" height="5" fill="#f7f7f4" />
          <rect x="-14" y="11" width="28" height="5" rx="1" fill="#f26a1b" />
        </g>
      ))}
      <g id="moto" transform="translate(20 150)">
        {/* moto vue de dessus */}
        <rect x="-20" y="-5" width="40" height="10" rx="5" fill="#f7f7f4" />
        <rect x="6" y="-14" width="4" height="28" rx="2" fill="#f7f7f4" />
        <circle cx="-4" cy="0" r="7" fill="#d3271c" />
      </g>
    </svg>
  );
}
