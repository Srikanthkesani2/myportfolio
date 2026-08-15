import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, title, lead, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-border py-28 md:py-40", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.3em] text-primary">{index}</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-6xl">
              {title}
            </h2>
          </div>
          {lead ? <p className="max-w-md text-base leading-relaxed text-muted-foreground">{lead}</p> : null}
        </div>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
