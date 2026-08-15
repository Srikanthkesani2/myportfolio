import { useEffect, useMemo, useRef, useState } from "react";
import { communityNetwork } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Living community network: a leadership core (PRESIDENT / SDC) with orbiting
 * pillars connected by curved, breathing filaments. Scroll-staged reveal,
 * pointer parallax on desktop, simplified geometry on small screens.
 */
export function CommunityNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0 idle · 1 core · 2 nodes · 3 links · 4 stats
  const [hovered, setHovered] = useState<string | null>(null);
  const [t, setT] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const nodes = useMemo(
    () =>
      communityNetwork.nodes.map((n, i) => {
        const total = communityNetwork.nodes.length;
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
        const radius = i % 2 === 0 ? 38 : 30;
        return { ...n, angle, radius };
      }),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          [1, 2, 3, 4].forEach((s, i) => setTimeout(() => setStage(s), i * 520));
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      setT((v) => v + 0.007);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const placed = nodes.map((n, i) => {
    const breathe = Math.sin(t * 0.9 + i) * 1.6;
    const r = n.radius + breathe;
    const wobble = Math.cos(t * 0.6 + i * 1.3) * 0.05;
    const a = n.angle + wobble;
    return {
      ...n,
      x: 50 + Math.cos(a) * r + pointer.x * 2.4,
      y: 50 + Math.sin(a) * r * 0.92 + pointer.y * 2.4,
    };
  });

  return (
    <div ref={ref} className="space-y-14">
      {/* Leadership statement — PRESIDENT is the strongest element */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-display text-[clamp(3rem,11vw,7rem)] font-medium leading-[0.85] tracking-[-0.05em] text-foreground">
            PRESIDENT
          </h3>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-primary md:text-sm">
            {communityNetwork.org}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {communityNetwork.period}
          </p>
        </div>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          {communityNetwork.body}
        </p>
      </div>

      <div
        className="relative mx-auto aspect-square w-full max-w-2xl"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <radialGradient id="sdc-core-glow">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle
            cx={50 + pointer.x * 1.2}
            cy={50 + pointer.y * 1.2}
            r="30"
            fill="url(#sdc-core-glow)"
            className={cn("transition-opacity duration-1000", stage >= 1 ? "opacity-100" : "opacity-0")}
          />

          {[30, 38].map((r) => (
            <ellipse
              key={r}
              cx={50 + pointer.x * 1.6}
              cy={50 + pointer.y * 1.6}
              rx={r}
              ry={r * 0.92}
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.12"
              strokeDasharray="0.8 2.4"
              className={cn("transition-opacity duration-1000", stage >= 2 ? "opacity-70" : "opacity-0")}
            />
          ))}

          {/* Curved filaments from the core */}
          {placed.map((n, i) => {
            const on = hovered === null || hovered === n.label;
            const mx = (50 + n.x) / 2 + Math.sin(t + i) * 4;
            const my = (50 + n.y) / 2 + Math.cos(t + i) * 4;
            const path = `M 50 50 Q ${mx} ${my} ${n.x} ${n.y}`;
            const prog = (Math.sin(t * 1.6 + i * 1.5) + 1) / 2;
            return (
              <g key={`link-${n.label}`}>
                <path
                  d={path}
                  fill="none"
                  stroke={on ? "var(--primary)" : "var(--border)"}
                  strokeWidth={hovered === n.label ? "0.6" : "0.32"}
                  strokeLinecap="round"
                  strokeDasharray="120"
                  strokeDashoffset={stage >= 3 ? 0 : 120}
                  opacity={on ? 0.7 : 0.18}
                  style={{
                    transition:
                      "stroke-dashoffset 1000ms ease-out, opacity 400ms, stroke-width 300ms",
                  }}
                />
                {stage >= 3 ? (
                  <circle
                    r={hovered === n.label ? "0.75" : "0.45"}
                    fill="var(--primary)"
                    opacity={on ? 0.95 : 0.12}
                    cx={50 + (n.x - 50) * prog}
                    cy={50 + (n.y - 50) * prog}
                  />
                ) : null}
              </g>
            );
          })}

          {/* Peer links — collaboration between pillars */}
          {stage >= 3
            ? placed.map((n, i) => {
                const next = placed[(i + 1) % placed.length]!;
                return (
                  <line
                    key={`peer-${n.label}`}
                    x1={n.x}
                    y1={n.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="var(--secondary-accent)"
                    strokeWidth="0.14"
                    opacity={hovered === null ? 0.28 : 0.1}
                  />
                );
              })
            : null}
        </svg>

        {/* Core */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-background/80 backdrop-blur-md transition-all duration-1000 md:size-40",
            "border-brand-red/50",
            stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
          style={{
            marginLeft: `${pointer.x * 6}px`,
            marginTop: `${pointer.y * 6}px`,
            boxShadow:
              stage >= 1
                ? "0 0 26px color-mix(in oklab, var(--brand-red) 35%, transparent), inset 0 0 30px color-mix(in oklab, var(--brand-red) 12%, transparent)"
                : "none",
          }}
        >
          <span className="glow-red-soft font-display text-4xl tracking-tight text-brand-red md:text-5xl">
            SDC
          </span>
          <span className="mt-1 font-mono text-[9px] tracking-[0.24em] text-muted-foreground">
            SNIST
          </span>
        </div>

        {/* Pillars */}
        {placed.map((n, i) => {
          const dim = hovered !== null && hovered !== n.label;
          return (
            <button
              key={n.label}
              type="button"
              onMouseEnter={() => setHovered(n.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.label)}
              onBlur={() => setHovered(null)}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transitionDelay: stage === 2 ? `${i * 100}ms` : "0ms",
              }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.16em] backdrop-blur-sm transition-[opacity,transform,color,background-color,border-color] duration-700 md:px-4 md:text-[11px]",
                stage >= 2 ? "scale-100 opacity-100" : "scale-75 opacity-0",
                hovered === n.label
                  ? "border-primary bg-primary/15 text-primary shadow-glow"
                  : "border-border bg-card/60 text-muted-foreground",
                dim && "opacity-40",
              )}
            >
              {n.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {communityNetwork.stats.map((s, i) => (
          <div
            key={s.label}
            style={{ transitionDelay: `${i * 130}ms` }}
            className={cn(
              "bg-card/30 p-8 transition-all duration-700",
              stage >= 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <div className="font-display text-4xl tracking-tight text-foreground">{s.value}</div>
            <div className="mt-2 font-mono text-[11px] tracking-[0.22em] text-secondary-accent">
              {s.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
