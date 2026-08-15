import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => journey.map(() => false));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset["index"]);
          if (entry.isIntersecting) {
            setRevealed((prev) => (prev[idx] ? prev : prev.map((v, i) => (i === idx ? true : v))));
          }
        });
      },
      { threshold: 0.35 },
    );
    nodeRefs.current.forEach((n) => n && observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      setProgress(p);

      let closest = 0;
      let min = Infinity;
      nodeRefs.current.forEach((n, i) => {
        if (!n) return;
        const d = Math.abs(n.getBoundingClientRect().top + n.offsetHeight / 2 - anchor);
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      setActive(closest);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Year rail indicator */}
      <div className="pointer-events-none sticky top-24 z-10 mb-10 flex justify-center">
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1.5 backdrop-blur-md">
          {journey.map((step, i) => (
            <span
              key={step.period}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.2em] transition-all duration-500",
                i === active
                  ? "bg-primary/15 text-primary shadow-glow"
                  : "text-muted-foreground/60",
              )}
            >
              {step.period}
            </span>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative pl-10 md:pl-0">
        {/* Spine */}
        <div className="absolute left-[13px] top-0 h-full w-px bg-border md:left-1/2">
          <div
            className="w-px bg-gradient-to-b from-primary via-primary to-secondary-accent shadow-glow transition-[height] duration-200"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        <div className="space-y-24 md:space-y-36">
          {journey.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={step.period}
                data-index={i}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="relative md:grid md:grid-cols-2 md:gap-16"
              >
                {/* Node */}
                <span
                  className={cn(
                    "absolute -left-[34px] top-3 flex size-[27px] items-center justify-center rounded-full border transition-all duration-500 md:left-1/2 md:-translate-x-1/2",
                    i === active
                      ? "scale-110 border-primary bg-primary/15 shadow-glow"
                      : "border-border bg-background",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-colors duration-500",
                      i <= active ? "bg-primary" : "bg-border",
                    )}
                  />
                </span>

                <div
                  className={cn(
                    "transition-all duration-700 ease-out",
                    left ? "md:col-start-1 md:pr-6 md:text-right" : "md:col-start-2 md:pl-6",
                    revealed[i]
                      ? "translate-y-0 opacity-100 blur-0"
                      : cn("opacity-0 blur-[6px]", left ? "-translate-x-4" : "translate-x-4"),
                  )}
                >
                  <div
                    className={cn(
                      "font-display text-6xl leading-none tracking-tight transition-colors duration-500 md:text-8xl",
                      i === active ? "text-foreground" : "text-muted-foreground/25",
                    )}
                  >
                    {step.period}
                  </div>

                  <ul
                    className={cn(
                      "mt-6 flex flex-wrap gap-2",
                      left ? "md:justify-end" : "md:justify-start",
                    )}
                  >
                    {step.markers.map((marker, m) => (
                      <li
                        key={marker}
                        style={{ transitionDelay: `${m * 90}ms` }}
                        className={cn(
                          "rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.22em] transition-all duration-700",
                          i === active
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-card/30 text-muted-foreground",
                          revealed[i] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                        )}
                      >
                        {marker}
                      </li>
                    ))}
                  </ul>

                  {step.notes?.length ? (
                    <div
                      className={cn(
                        "mt-6 space-y-2 transition-all duration-700",
                        left ? "md:ml-auto" : "",
                        "max-w-sm",
                        revealed[i] ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                      )}
                    >
                      {step.notes.map((note) => (
                        <p key={note} className="text-sm leading-relaxed text-muted-foreground">
                          {note}
                        </p>
                      ))}
                    </div>
                  ) : null}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
