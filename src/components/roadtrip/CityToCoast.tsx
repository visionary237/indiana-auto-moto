"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scène 01 : Escape the city.
 * La ville se dissout au défilement et laisse place à la côte normande.
 * Illustration vectorielle animée en attendant le film définitif (voir ASSETS.md, RT-V01).
 */
export function CityToCoast() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("rt-static");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.to(".rt-city", { y: 520, opacity: 0, duration: 1 }, 0.15)
        .to(".rt-cars", { opacity: 0, duration: 0.3 }, 0.15)
        .to(".rt-traffic", { opacity: 0, duration: 0.3 }, 0.1)
        .to(".rt-sky-grey", { opacity: 0, duration: 0.8 }, 0.3)
        .fromTo(".rt-sun", { y: 240 }, { y: 0, duration: 0.9 }, 0.35)
        .fromTo(".rt-sea", { y: 380 }, { y: 0, duration: 0.8 }, 0.35)
        .fromTo(".rt-cliffs", { y: 380, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.45)
        .fromTo(".rt-fields", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5)
        .to(".rt-road-asphalt", { fill: "#2b2f33", duration: 0.6 }, 0.4)
        .to(".rt-text-a", { opacity: 0, y: -40, duration: 0.25 }, 0.4)
        .fromTo(".rt-text-b", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.7);
      gsap.to(".rt-cars rect", { x: "+=40", repeat: -1, yoyo: true, duration: 1.6, ease: "sine.inOut", stagger: 0.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[260vh] bg-carbone text-sable [&.rt-static]:h-auto" aria-label="Quitter la ville">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#24435a" />
              <stop offset=".55" stopColor="#e88a55" />
              <stop offset="1" stopColor="#f3c58f" />
            </linearGradient>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b7c8f" />
              <stop offset="1" stopColor="#12536a" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#sky)" />
          <rect className="rt-sky-grey" width="1600" height="900" fill="#8c9398" />
          <circle className="rt-sun" cx="1080" cy="520" r="90" fill="#ffd9a0" opacity=".9" />
          <g className="rt-sea"><rect y="520" width="1600" height="380" fill="url(#sea)" />
            <path d="M0 560 Q400 548 800 560 T1600 560" stroke="#f7e3c4" strokeOpacity=".35" strokeWidth="3" fill="none" /></g>
          <g className="rt-cliffs">
            <path d="M0 505 L120 470 L330 462 L420 500 L470 560 L0 560 Z" fill="#f1ece2" />
            <path d="M0 505 L120 470 L330 462 L420 500 L415 492 L330 455 L120 462 L0 496 Z" fill="#4c7a4e" />
            <path d="M1180 500 L1300 455 L1600 445 L1600 560 L1150 560 Z" fill="#ebe5d8" />
            <path d="M1180 500 L1300 455 L1600 445 L1600 437 L1300 447 L1175 494 Z" fill="#4c7a4e" />
          </g>
          <g className="rt-city">
            {[
              [0, 210], [70, 320], [150, 250], [230, 380], [320, 290], [400, 340], [470, 230], [1080, 300], [1160, 400], [1250, 270], [1330, 350], [1420, 240], [1500, 330],
            ].map(([x, h], i) => (
              <g key={i}>
                <rect x={x} y={560 - h} width="78" height={h} fill={i % 2 ? "#3a3f44" : "#2f3439"} />
                {Array.from({ length: Math.floor(h / 40) }).map((_, j) => (
                  <rect key={j} x={x + 14} y={560 - h + 18 + j * 40} width="50" height="10" fill="#c9b27a" opacity={(i + j) % 3 ? 0.15 : 0.55} />
                ))}
              </g>
            ))}
          </g>
          <g className="rt-fields">
            <path d="M0 560 L780 560 L380 900 L0 900 Z" fill="#2f5444" />
            <path d="M820 560 L1600 560 L1600 900 L1220 900 Z" fill="#244534" />
          </g>
          <path className="rt-road-asphalt" d="M780 560 L820 560 L1220 900 L380 900 Z" fill="#45494d" />
          <path d="M800 568 L800 900" stroke="#f7f7f4" strokeWidth="6" strokeDasharray="30 34" />
          <g className="rt-cars">
            <rect x="560" y="800" width="120" height="56" rx="10" fill="#9b2a22" />
            <rect x="900" y="740" width="90" height="42" rx="8" fill="#1f2a36" />
            <rect x="700" y="660" width="60" height="30" rx="6" fill="#c9cdd0" />
            <rect x="840" y="610" width="40" height="20" rx="4" fill="#5c6670" />
          </g>
          <g className="rt-traffic">
            <rect x="1040" y="380" width="22" height="64" rx="4" fill="#15171a" />
            <circle cx="1051" cy="396" r="7" fill="#e5483b" />
            <rect x="1049" y="444" width="4" height="116" fill="#15171a" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-carbone/70 via-transparent to-carbone/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbone/70 via-carbone/20 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
          <div className="relative w-full max-w-3xl">
            <div className="rt-text-a">
              <p className="font-display text-xl font-semibold text-sable/80">Escape the city</p>
              <p id="scene-ville" className="font-editorial mt-3 text-[clamp(2.6rem,6vw,5.4rem)] text-white">
                Vous voulez passer votre permis moto, mais près de chez vous, les créneaux se font rares ?
              </p>
            </div>
            <div className="rt-text-b absolute inset-x-0 top-0 opacity-0 [.rt-static_&]:relative [.rt-static_&]:mt-10 [.rt-static_&]:opacity-100">
              <p className="font-display text-xl font-semibold text-sable/80">À deux heures de Paris</p>
              <p className="font-editorial mt-3 text-[clamp(2.6rem,6vw,5.4rem)] text-white">
                Et si vous partiez deux semaines l'apprendre face à la mer&nbsp;?
              </p>
              <a href="#rt-titre" className="btn btn-sunset mt-8">Découvrir le séjour</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
