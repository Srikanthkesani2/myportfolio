import { Award, ExternalLink } from "lucide-react";

export type Certification = {
  name: string;
  issuer: string;
};

export function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <article className="group relative">
      <div className="surface-depth relative h-full overflow-hidden rounded-2xl border border-border bg-card/20 p-8 transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-1 group-hover:border-primary/25 group-hover:bg-card/35">
        {/* Subtle corner accent */}
        <div
          className="absolute right-0 top-0 size-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="rounded-full border border-border bg-background/50 p-2 transition-all duration-300 group-hover:border-primary/25 group-hover:bg-primary/10">
              <Award className="size-4 text-primary" aria-hidden="true" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-display text-xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
              {cert.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span>Verified credential</span>
          </div>
        </div>
      </div>
    </article>
  );
}
