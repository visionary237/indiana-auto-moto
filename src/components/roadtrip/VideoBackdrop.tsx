"use client";

import { useEffect, useRef, useState } from "react";

/** Vidéo d'ambiance muette en boucle, avec bouton pause (WCAG 2.2.2) et respect de prefers-reduced-motion. */
export function VideoBackdrop({ src, poster, className = "", label }: { src: string; poster: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPlaying(false);
      return;
    }
    // ne lit la vidéo que lorsqu'elle est visible
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && playing) v.play().catch(() => setPlaying(false));
      else v.pause();
    }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, [playing]);

  return (
    <>
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={label}
      />
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
        }}
        className="absolute bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-carbone/60 text-white backdrop-blur hover:bg-carbone"
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1 L13 7 L3 13 Z" fill="currentColor" /></svg>
        )}
      </button>
    </>
  );
}
