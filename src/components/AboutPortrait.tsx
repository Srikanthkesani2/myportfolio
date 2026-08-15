import { useEffect, useRef, useState } from "react";

import portrait from "../assets/portrait.png";
/**
 * Portrait framed by a calm orbital system: thin rings, slow-drifting nodes and
 * soft green/red accent glows. Very restrained parallax follows the pointer on
 * desktop; motion is disabled for reduced-motion users and simplified on mobile.
 */
export function AboutPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [t, setT] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) {
      setMotion(false);
      return;
    }
    let raf = 0;
    const loop = () => {
      setT((v) => v + 0.006);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width * 1.4);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height * 1.4);
      setP({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const nodes = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * Math.PI * 2 + (motion ? t * 0.6 : 0);
    const r = i % 2 === 0 ? 44 : 36;
    return {
      i,
      x: 50 + Math.cos(a) * r,
      y: 50 + Math.sin(a) * r * 0.9,
      accent: i === 2,
    };
  });

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-sm select-none md:max-w-none"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 68%)",
          transform: `translate(${p.x * -8}px, ${p.y * -8}px)`,
          transition: "transform 500ms ease-out",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[14%] size-24 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-red) 22%, transparent), transparent 70%)",
          transform: `translate(${p.x * 10}px, ${p.y * 10}px)`,
          transition: "transform 500ms ease-out",
        }}
        aria-hidden
      />

      {/* Orbital system */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        style={{
          transform: `translate(${p.x * 6}px, ${p.y * 6}px)`,
          transition: "transform 500ms ease-out",
        }}
        aria-hidden
      >
        {[46, 38, 30].map((r, i) => (
          <ellipse
            key={r}
            cx="50"
            cy="50"
            rx={r}
            ry={r * 0.9}
            fill="none"
            stroke={i === 1 ? "var(--brand-red)" : "var(--primary)"}
            strokeOpacity={i === 1 ? 0.16 : 0.22}
            strokeWidth="0.2"
            strokeDasharray={i === 2 ? "1 3" : undefined}
          />
        ))}
        {nodes.map((n) => (
          <circle
            key={n.i}
            cx={n.x}
            cy={n.y}
            r={n.accent ? 0.75 : 0.55}
            fill={n.accent ? "var(--brand-red)" : "var(--primary)"}
            opacity={n.accent ? 0.9 : 0.7}
          />
        ))}
      </svg>

      {/* Portrait */}
      <img
        src={portrait}
        alt="Portrait of Kesani Srikanth Reddy"
        loading="lazy"
        className="relative z-10 mx-auto h-full w-auto object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.55)]"
        style={{
          transform: `translate(${p.x * 10}px, ${p.y * 10 + (motion ? Math.sin(t * 1.2) * 4 : 0)}px)`,
          transition: "transform 400ms ease-out",
        }}
      />

      {/* Base line */}
      <div
        className="pointer-events-none absolute inset-x-6 bottom-2 h-px bg-gradient-line opacity-70"
        aria-hidden
      />
    </div>
  );
}
