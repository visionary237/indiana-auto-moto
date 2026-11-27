/**
 * Coup d'accélérateur synthétisé (Web Audio) : aucun fichier audio à charger.
 * Préférence mémorisée dans le navigateur ; désactivable depuis l'en-tête.
 */
let ctx: AudioContext | null = null;
let last = 0;
const KEY = "indiana-son";
const listeners = new Set<() => void>();

export function soundEnabled() {
  try { return localStorage.getItem(KEY) !== "off"; } catch { return true; }
}
export function setSoundEnabled(on: boolean) {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* stockage indisponible */ }
  listeners.forEach((l) => l());
}
export function subscribeSound(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

function distortion(amount: number) {
  const n = 1024, curve = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i * 2) / n - 1; curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x)); }
  return curve;
}

/** Joue un « vroum » court : montée en régime puis relâchement, avec le claquement du bicylindre. */
export function rev(intensity = 1) {
  if (typeof window === "undefined" || !soundEnabled()) return;
  const now = performance.now();
  if (now - last < 350) return; // pas de rafale
  last = now;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new AC();
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime, d = 0.95;

    // Allumages : un oscillateur carré module le volume (effet « pop-pop »)
    const engine = ctx.createOscillator(); engine.type = "sawtooth";
    const sub = ctx.createOscillator(); sub.type = "square";
    const fire = ctx.createOscillator(); fire.type = "square";
    const fireGain = ctx.createGain(); fireGain.gain.value = 0.5;
    const am = ctx.createGain(); am.gain.value = 0.5;

    const f0 = 42, peak = 120 + 40 * intensity;
    for (const [o, mult] of [[engine, 1], [sub, 0.5]] as const) {
      o.frequency.setValueAtTime(f0 * mult, t);
      o.frequency.exponentialRampToValueAtTime(peak * mult, t + 0.28);
      o.frequency.exponentialRampToValueAtTime(65 * mult, t + d);
    }
    fire.frequency.setValueAtTime(18, t);
    fire.frequency.exponentialRampToValueAtTime(55, t + 0.28);
    fire.frequency.exponentialRampToValueAtTime(24, t + d);

    const shaper = ctx.createWaveShaper(); shaper.curve = distortion(60); shaper.oversample = "2x";
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(500, t); lp.frequency.linearRampToValueAtTime(1500, t + 0.25); lp.frequency.linearRampToValueAtTime(600, t + d);
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.16 * intensity, t + 0.04);
    out.gain.exponentialRampToValueAtTime(0.11 * intensity, t + 0.4);
    out.gain.exponentialRampToValueAtTime(0.0001, t + d);

    fire.connect(fireGain).connect(am.gain);
    engine.connect(am); sub.connect(am);
    am.connect(shaper).connect(lp).connect(out).connect(ctx.destination);
    [engine, sub, fire].forEach((o) => { o.start(t); o.stop(t + d + 0.05); });
  } catch { /* audio non disponible : on ignore */ }
}
