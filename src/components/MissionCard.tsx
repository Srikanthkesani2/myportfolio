import { Calendar, Rocket, Trophy } from "lucide-react";

export type Mission = {
  title: string;
  category: "Hackathon" | "Event" | "Bootcamp";
  location: string;
};

const categoryMeta = {
  Hackathon: {
    icon: Trophy,
    gradient: "from-primary/20 to-primary/5",
    badge: "text-primary border-primary/25",
  },
  Event: {
    icon: Calendar,
    gradient: "from-secondary-accent/20 to-secondary-accent/5",
    badge: "text-secondary-accent border-secondary-accent/25",
  },
  Bootcamp: {
    icon: Rocket,
    gradient: "from-chart-4/20 to-chart-4/5",
    badge: "text-chart-4 border-chart-4/25",
  },
};

export function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const meta = categoryMeta[mission.category];
  const Icon = meta.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative">
      {/* Animated top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="surface-depth relative h-full overflow-hidden rounded-2xl border border-border bg-card/20 p-7 transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-1.5 group-hover:border-primary/25 group-hover:bg-card/35">
        {/* Background glow wash */}
        <div
          className={`pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br ${meta.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              {number}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm transition-all duration-300 group-hover:shadow-glow ${meta.badge}`}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {mission.category}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-3xl">
              {mission.title}
            </h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-primary/60" aria-hidden="true" />
              {mission.location}
            </p>
          </div>

          {/* Hover orbit ring */}
          <div
            className="absolute -right-6 -bottom-6 size-24 rounded-full border border-dashed border-border/60 opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
