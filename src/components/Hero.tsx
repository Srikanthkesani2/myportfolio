import { profile } from "@/data/portfolio";
import { HeroVisual } from "@/components/HeroVisual";

const roles = ["AI/ML STUDENT", "FULL-STACK DEVELOPER", "COMMUNITY BUILDER"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden"
    >
      {/* Ambient surface */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-line" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Abstract AI neural core (behind content) */}
      <div
        className="pointer-events-none absolute right-[-12%] top-1/2 aspect-square w-[85vw] max-w-[720px] -translate-y-1/2 opacity-40 md:right-[-6%] md:w-[52vw] md:opacity-70"
        aria-hidden
      >
        <HeroVisual className="size-full" />
      </div>

      {/* Corner frame */}
      <div className="pointer-events-none absolute inset-6 md:inset-10" aria-hidden>
        <div className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-primary/50 to-transparent" />
        <div className="absolute right-0 top-0 h-8 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute right-0 top-0 h-px w-8 bg-gradient-to-l from-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 h-8 w-px bg-gradient-to-t from-secondary-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-8 bg-gradient-to-r from-secondary-accent/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-secondary-accent/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-secondary-accent/40 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:py-36">
        {/* Top status bar */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary shadow-glow" />
            </span>
            Available for collaborations
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
            {profile.location}
          </span>
        </div>

        {/* Main headline */}
        <div className="mt-14 md:mt-20">
          <h1 className="group font-display text-[clamp(4.5rem,18vw,14rem)] font-medium leading-[0.82] tracking-[-0.055em] text-foreground">
            SRIKS
            <span className="text-brand-red brand-glow">.DEV</span>
          </h1>

          {/* Role strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 md:mt-8 md:gap-x-6">
            {roles.map((role, i) => (
              <span
                key={role}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-sm"
              >
                <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row: intro + CTAs */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-end">
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              EXPLORE WORK
              <svg
                className="size-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              CONNECT
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
