import { useEffect, useRef } from "react";

type P = { a: number; r: number; ring: number; speed: number; size: number };

/**
 * Premium AI visual: layered rotating orbital rings with drifting data particles,
 * a luminous core, and gentle mouse parallax. Canvas 2D only — no WebGL, no deps.
 * Simplified on mobile, static-friendly for reduced motion.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const RINGS = isMobile ? 3 : 5;
    const ringDefs = Array.from({ length: RINGS }, (_, i) => ({
      radius: 0.32 + i * (0.62 / RINGS),
      tilt: 0.22 + i * 0.16,
      dir: i % 2 === 0 ? 1 : -1,
      speed: 0.07 + i * 0.021,
    }));

    const particleCount = isMobile ? 34 : 78;
    const particles: P[] = Array.from({ length: particleCount }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: 0.28 + Math.random() * 0.66,
      ring: i % RINGS,
      speed: 0.12 + Math.random() * 0.28,
      size: 0.6 + Math.random() * 1.8,
    }));

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0;
    let my = 0;
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile && !reduced) window.addEventListener("pointermove", onMove, { passive: true });

    const MINT = "150, 255, 200";
    const CYAN = "120, 225, 240";

    let raf = 0;
    let t = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) t += dt;
      px += (mx - px) * 0.045;
      py += (my - py) * 0.045;

      const cx = w / 2 + px * (isMobile ? 6 : 22);
      const cy = h / 2 + py * (isMobile ? 6 : 22);
      const R = Math.min(w, h) * 0.44;

      ctx.clearRect(0, 0, w, h);

      // Core halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.95);
      halo.addColorStop(0, `rgba(${MINT}, 0.16)`);
      halo.addColorStop(0.45, `rgba(${CYAN}, 0.05)`);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Orbital rings (tilted ellipses, slow counter-rotation)
      ringDefs.forEach((ring, i) => {
        const rot = t * ring.speed * ring.dir + i * 0.5 + px * 0.25;
        const squash = Math.abs(Math.cos(t * 0.16 * ring.dir + ring.tilt)) * 0.62 + 0.14 + py * 0.08;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, R * ring.radius, R * ring.radius * squash, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? `rgba(${MINT}, 0.20)` : `rgba(${CYAN}, 0.16)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Travelling node on the ring
        const na = t * (0.5 + i * 0.17) * ring.dir;
        const nx = Math.cos(na) * R * ring.radius;
        const ny = Math.sin(na) * R * ring.radius * squash;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? `rgba(${MINT}, 0.9)` : `rgba(${CYAN}, 0.9)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT}, 0.06)`;
        ctx.fill();
        ctx.restore();
      });

      // Drifting particles bound to rings
      const pts: { x: number; y: number; s: number; d: number }[] = [];
      for (const p of particles) {
        const ring = ringDefs[p.ring]!;
        const rot = t * ring.speed * ring.dir + p.ring * 0.5 + px * 0.25;
        const squash = Math.abs(Math.cos(t * 0.16 * ring.dir + ring.tilt)) * 0.62 + 0.14 + py * 0.08;
        const a = p.a + t * p.speed * ring.dir;
        const lx = Math.cos(a) * R * p.r;
        const ly = Math.sin(a) * R * p.r * squash;
        const x = cx + lx * Math.cos(rot) - ly * Math.sin(rot);
        const y = cy + lx * Math.sin(rot) + ly * Math.cos(rot);
        const depth = (Math.sin(a) + 1) / 2;
        pts.push({ x, y, s: p.size, d: depth });
      }

      // Connection filaments between nearby particles
      const maxLink = isMobile ? 60 : 86;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]!;
          const b = pts[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxLink) {
            ctx.strokeStyle = `rgba(${MINT}, ${(0.14 * (1 - d / maxLink)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const alpha = 0.25 + p.d * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * (0.6 + p.d * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Luminous core
      const pulse = 1 + Math.sin(t * 1.4) * 0.06;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.16 * pulse);
      core.addColorStop(0, `rgba(215, 255, 235, 0.95)`);
      core.addColorStop(0.35, `rgba(${MINT}, 0.45)`);
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.16 * pulse, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
