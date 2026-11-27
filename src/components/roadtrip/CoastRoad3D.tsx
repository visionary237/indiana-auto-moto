"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Route côtière normande en 3D low-poly, générée en code (aucun modèle à télécharger).
 * La moto roule en continu ; le défilement de la page accélère la caméra ; la souris décale légèrement le point de vue.
 * Se met en pause hors écran, rend une image fixe si « réduire les animations » est activé, et laisse
 * la photo de repli si WebGL est indisponible.
 */
export function CoastRoad3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const canvasTest = document.createElement("canvas");
      if (!(canvasTest.getContext("webgl2") || canvasTest.getContext("webgl"))) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;
      const renderer = new THREE.WebGLRenderer({ antialias: !small, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const SKY = new THREE.Color("#f2a15f");
      scene.background = SKY;
      scene.fog = new THREE.Fog(SKY, 60, 330);
      const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 900);

      // Ciel : dégradé crépuscule sur une grande sphère
      const skyGeo = new THREE.SphereGeometry(800, 24, 12);
      const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { top: { value: new THREE.Color("#3b5872") }, mid: { value: new THREE.Color("#e88a55") }, bottom: { value: new THREE.Color("#f6c98f") } },
        vertexShader: "varying float h; void main(){ h = normalize(position).y; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
        fragmentShader: "uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying float h; void main(){ vec3 c = h>0.08 ? mix(mid, top, smoothstep(0.08,0.55,h)) : mix(bottom, mid, smoothstep(-0.05,0.08,h)); gl_FragColor = vec4(c,1.0); }",
      });
      scene.add(new THREE.Mesh(skyGeo, skyMat));

      // Soleil bas sur la mer
      const sun = new THREE.Mesh(new THREE.CircleGeometry(26, 40), new THREE.MeshBasicMaterial({ color: "#ffe2b0", fog: false }));
      scene.add(sun);

      scene.add(new THREE.HemisphereLight("#ffe0bd", "#3d5c48", 1.7));
      const dir = new THREE.DirectionalLight("#ffc48a", 2.1);
      scene.add(dir);

      // Relief : plateau du pays de Caux qui s'arrête net en falaise de craie
      const LEN = 1400;
      const edge = (z: number) => 34 + 9 * Math.sin(z * 0.012) + 4 * Math.sin(z * 0.037 + 1.3);
      const noise = (x: number, z: number) => Math.sin(x * 0.11 + z * 0.07) * 1.4 + Math.sin(x * 0.23 - z * 0.13) * 0.7 + Math.sin(z * 0.031) * 2;
      const landH = (x: number, z: number) => {
        const e = edge(z);
        if (x > e + 2.5) return -6;
        const top = 16 + noise(x, z) * 0.8 + Math.max(0, (e - x) * 0.06);
        if (x > e) return top - ((x - e) / 2.5) * (top + 6);
        return top;
      };
      const segX = small ? 60 : 90, segZ = small ? 180 : 280;
      const land = new THREE.PlaneGeometry(160, LEN, segX, segZ);
      land.rotateX(-Math.PI / 2);
      const pos = land.attributes.position as InstanceType<typeof THREE.BufferAttribute>;
      const colors: number[] = [];
      const grass = new THREE.Color("#4f7d4c"), grass2 = new THREE.Color("#6f9452"), chalk = new THREE.Color("#efe9dc"), field = new THREE.Color("#c9b46a");
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) - 50, z = pos.getZ(i) - LEN / 2 + 40;
        const y = landH(x, z);
        pos.setXYZ(i, x, y, z);
        const e = edge(z);
        const c = x > e - 0.6 ? chalk : (Math.sin(x * 0.09) * Math.sin(z * 0.05) > 0.45 ? field : (noise(x, z) > 0.6 ? grass2 : grass));
        colors.push(c.r, c.g, c.b);
      }
      land.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      land.computeVertexNormals();
      scene.add(new THREE.Mesh(land, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 })));

      // Mer animée
      const seaGeo = new THREE.PlaneGeometry(700, LEN, small ? 40 : 70, small ? 120 : 200);
      seaGeo.rotateX(-Math.PI / 2);
      seaGeo.translate(330, -2.2, -LEN / 2 + 40);
      const seaPos = seaGeo.attributes.position as InstanceType<typeof THREE.BufferAttribute>;
      const seaBase = Float32Array.from(seaPos.array as Float32Array);
      const sea = new THREE.Mesh(seaGeo, new THREE.MeshStandardMaterial({ color: "#1f6f84", flatShading: true, roughness: 0.55, metalness: 0.1 }));
      scene.add(sea);

      // Route en corniche, en retrait du bord de falaise
      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let z = 30; z > -LEN + 80; z -= 20) {
        const x = edge(z) - 13 + 4 * Math.sin(z * 0.02);
        pts.push(new THREE.Vector3(x, 0, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const SAMPLES = 900, W = 3.4;
      const roadV: number[] = [], lineV: number[] = [], idx: number[] = [], lidx: number[] = [];
      const up = new THREE.Vector3(0, 1, 0);
      const heightAt = (x: number, z: number) => landH(x, z) + 0.12;
      for (let i = 0; i <= SAMPLES; i++) {
        const t = i / SAMPLES, p = curve.getPointAt(t), tan = curve.getTangentAt(t);
        const side = new THREE.Vector3().crossVectors(tan, up).normalize();
        const l = p.clone().addScaledVector(side, -W), r = p.clone().addScaledVector(side, W);
        roadV.push(l.x, heightAt(l.x, l.z), l.z, r.x, heightAt(r.x, r.z), r.z);
        const ml = p.clone().addScaledVector(side, -0.12), mr = p.clone().addScaledVector(side, 0.12);
        lineV.push(ml.x, heightAt(p.x, p.z) + 0.03, ml.z, mr.x, heightAt(p.x, p.z) + 0.03, mr.z);
        if (i < SAMPLES) {
          const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
          if (i % 6 < 3) lidx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
      }
      const roadGeo = new THREE.BufferGeometry();
      roadGeo.setAttribute("position", new THREE.Float32BufferAttribute(roadV, 3)); roadGeo.setIndex(idx); roadGeo.computeVertexNormals();
      scene.add(new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ color: "#34383c", roughness: 0.9 })));
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineV, 3)); lineGeo.setIndex(lidx);
      scene.add(new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: "#f3ead7" })));

      // Poteaux blancs de bord de route (comme sur la corniche d'Étretat)
      const postGeo = new THREE.BoxGeometry(0.25, 1, 0.25);
      const posts = new THREE.InstancedMesh(postGeo, new THREE.MeshStandardMaterial({ color: "#f4f1ea" }), 160);
      const m4 = new THREE.Matrix4();
      for (let i = 0; i < 160; i++) {
        const t = i / 160, p = curve.getPointAt(t), tan = curve.getTangentAt(t);
        const side = new THREE.Vector3().crossVectors(tan, up).normalize().multiplyScalar(i % 2 ? W + 1 : -(W + 1));
        const q = p.clone().add(side);
        m4.makeTranslation(q.x, heightAt(q.x, q.z) + 0.5, q.z); posts.setMatrixAt(i, m4);
      }
      scene.add(posts);

      // Arbres en bosquets côté terre
      const treeGeo = new THREE.ConeGeometry(1.6, 4.5, 6); treeGeo.translate(0, 2.2, 0);
      const trees = new THREE.InstancedMesh(treeGeo, new THREE.MeshStandardMaterial({ color: "#2f5a3c", flatShading: true }), small ? 220 : 420);
      let n = 0, seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      while (n < trees.count) {
        const z = 20 - rnd() * (LEN - 120), x = edge(z) - 22 - rnd() * 70;
        if (Math.abs(x - (edge(z) - 13)) < 8) continue;
        const s = 0.7 + rnd() * 0.9;
        m4.compose(new THREE.Vector3(x, landH(x, z), z), new THREE.Quaternion(), new THREE.Vector3(s, s * (0.9 + rnd() * 0.5), s));
        trees.setMatrixAt(n++, m4);
      }
      scene.add(trees);

      // Moto + pilote, low-poly
      const moto = new THREE.Group();
      const red = new THREE.MeshStandardMaterial({ color: "#d3271c", roughness: 0.5, metalness: 0.2 });
      const dark = new THREE.MeshStandardMaterial({ color: "#16181b", roughness: 0.8 });
      const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.18, 14); wheelGeo.rotateZ(Math.PI / 2);
      const w1 = new THREE.Mesh(wheelGeo, dark); w1.position.set(0, 0.42, 0.75);
      const w2 = new THREE.Mesh(wheelGeo, dark); w2.position.set(0, 0.42, -0.75);
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 1.3), red); body.position.set(0, 0.85, 0);
      const rider = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.75, 0.42), dark); rider.position.set(0, 1.45, 0.15); rider.rotation.x = -0.35;
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), new THREE.MeshStandardMaterial({ color: "#f4f1ea", roughness: 0.3 })); helmet.position.set(0, 1.95, -0.05);
      const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.11, 12), new THREE.MeshBasicMaterial({ color: "#fff4d6" })); lamp.position.set(0, 1.0, -0.69); lamp.rotation.y = Math.PI;
      moto.add(w1, w2, body, rider, helmet, lamp);
      scene.add(moto);

      // Animation
      let t = 0.02, speed = 0.0045, target = 0.0045, mx = 0, my = 0, raf = 0, visible = true, last = performance.now();
      const look = new THREE.Vector3();
      const onScroll = () => { const r = el.getBoundingClientRect(); const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))); target = 0.0045 + p * 0.01; };
      const onMove = (e: PointerEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
      const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 70 : 56; camera.updateProjectionMatrix(); };
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        speed += (target - speed) * 0.05;
        t += speed * dt * 6;
        if (t > 0.93) t = 0.02;
        const mt = Math.min(0.98, t + 0.012);
        const mp = curve.getPointAt(mt), mtan = curve.getTangentAt(mt);
        moto.position.set(mp.x, heightAt(mp.x, mp.z) - 0.1, mp.z);
        moto.lookAt(mp.clone().sub(mtan));
        const turn = curve.getTangentAt(Math.min(0.98, mt + 0.01)).x - mtan.x;
        moto.rotateZ(-turn * 18 + Math.sin(now / 900) * 0.02);
        const cp = curve.getPointAt(t), side = new THREE.Vector3().crossVectors(mtan, up).normalize();
        const wide = camera.aspect > 1;
        camera.position.set(cp.x - side.x * (wide ? 3.5 : 1) + mx * 1.5, heightAt(cp.x, cp.z) + (wide ? 4.2 : 3.6) - my * 0.8, cp.z - side.z * (wide ? 3.5 : 1));
        // Ordinateur : la moto passe à droite du texte ; mobile : au centre, au-dessus du texte
        look.set(mp.x - side.x * (wide ? 7 : 0) + 3, heightAt(mp.x, mp.z) + (wide ? 0.6 : -1.5), mp.z - 10);
        camera.lookAt(look);
        sun.position.set(camera.position.x + 260, 28, camera.position.z - 420);
        sun.lookAt(camera.position);
        dir.position.set(camera.position.x + 120, 40, camera.position.z - 200); dir.target.position.copy(camera.position);
        if (!small) {
          const arr = seaPos.array as Float32Array, k = now / 1400;
          for (let i = 0; i < arr.length; i += 3) arr[i + 1] = seaBase[i + 1] + Math.sin(seaBase[i] * 0.06 + k) * 0.35 + Math.cos(seaBase[i + 2] * 0.05 + k * 1.3) * 0.3;
          seaPos.needsUpdate = true;
        }
        renderer.render(scene, camera);
        if (visible && !reduce) raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting && !document.hidden;
        cancelAnimationFrame(raf);
        if (visible && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); }
      });
      const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (visible && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      io.observe(el);
      frame(performance.now());
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect();
        window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        scene.traverse((o) => { const m = o as InstanceType<typeof THREE.Mesh>; m.geometry?.dispose?.(); const mat = m.material as { dispose?: () => void } | undefined; mat?.dispose?.(); });
        renderer.dispose(); renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`} />;
}
