import { useRef, useState } from "react";

export type Project = {
  name: string;
  category: string;
  year?: string;
  summary: string;
  highlights?: string[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string | null;
};


export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reversed = index % 2 === 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Subtle tilt depth (max 3.5°) — feels premium, not gimmicky
    setTilt({
      x: (0.5 - py) * 3.5,
      y: (px - 0.5) * 3.5,
      imgX: (px - 0.5) * 16,
      imgY: (py - 0.5) * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, imgX: 0, imgY: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="group relative"
      data-cursor="VIEW"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="surface-depth relative overflow-hidden rounded-2xl border border-border bg-card/20 transition-all duration-300 ease-out will-change-transform hover:border-primary/35 hover:bg-card/35"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "8px" : "0px"})`,
          boxShadow: isHovered
            ? "0 28px 70px -30px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)"
            : "0 20px 50px -30px rgba(0,0,0,0.45)",
        }}
      >
        <div className="grid gap-0 md:grid-cols-2">
          {/* Visual */}
          <div
            className={`relative aspect-[4/3] overflow-hidden border-b border-border md:aspect-auto md:min-h-[24rem] lg:min-h-[28rem] md:border-b-0 ${
              reversed ? "md:order-2 md:border-l" : "md:border-r"
            }`}
          >
            <img
              src={project.image}
              alt={`${project.name} — ${project.category} visual`}
              width={1280}
              height={960}
              loading="lazy"
              className="size-full object-cover opacity-80 transition-[transform,opacity] duration-700 ease-out will-change-transform group-hover:opacity-100"
              style={{
                transform: `scale(${isHovered ? 1.08 : 1}) translate(${tilt.imgX}px, ${tilt.imgY}px)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand-red/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <span className="absolute left-5 top-5 rounded-full border border-border bg-background/80 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary-accent backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Content */}
          <div className={`flex flex-col justify-between gap-8 p-7 md:p-10 lg:p-12 ${reversed ? "md:order-1" : ""}`}>
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.year ? (
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    {project.year}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-4xl lg:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
                {project.summary}
              </p>
              {project.highlights?.length ? (
                <ul className="mt-6 space-y-2.5">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

            </div>

            <div className="space-y-6">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-background/40 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/25 group-hover:text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
                <a
                  href={project.github || undefined}
                  target={project.github ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-disabled={project.github ? undefined : true}
                  className={`inline-flex items-center gap-2 rounded-md border bg-background/50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                    project.github
                      ? "border-border text-foreground hover:border-primary hover:text-primary"
                      : "pointer-events-none border-dashed border-border text-muted-foreground/70"
                  }`}
                >

                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-glow"
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-border bg-background/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/70">
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Demo on request
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
