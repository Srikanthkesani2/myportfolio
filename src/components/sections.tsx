import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { MissionCard } from "@/components/MissionCard";
import { CertificationCard } from "@/components/CertificationCard";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { CommunityNetwork } from "@/components/CommunityNetwork";
import { ContactForm } from "@/components/ContactForm";
import { AboutPortrait } from "@/components/AboutPortrait";
import {
  capabilities,
  certifications,
  community,
  experience,
  missions,
  profile,
  projects,
} from "@/data/portfolio";

export function About() {
  return (
    <Section id="about" index="01" title="About" lead="A short version of the long story.">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <AboutPortrait />

        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-1 lg:gap-8">
        <div className="space-y-6">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-border bg-card/30 p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Education
            </span>
            <p className="mt-4 font-display text-lg leading-snug text-foreground">
              {profile.education.degree}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.education.school}</p>
            <div className="mt-5 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>CGPA {profile.education.cgpa}</span>
              <span>{profile.education.period}</span>
            </div>
          </div>

          <ul className="space-y-3 border-l border-border pl-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <li>Based in {profile.location}</li>
            <li>AI / ML Student</li>
            <li>Data analytics & Python</li>
            <li>President, SDC SNIST</li>
          </ul>
        </div>
        </div>
      </div>

    </Section>
  );
}

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="02"
      title="Capabilities"
      lead="The languages, data skills, frameworks and tools I actually work with."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {capabilities.map((cap) => (
          <article
            key={cap.title}
            className="group surface-depth bg-card/30 p-9 transition-colors hover:bg-card/60"
          >
            <h3 className="font-display text-xl text-foreground">{cap.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cap.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {cap.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-secondary-accent transition-colors group-hover:border-primary/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      title="Project Lab"
      lead="Selected builds across applied AI, automation and security."
    >
      <div className="grid gap-10 md:gap-14">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      title="Experience"
      lead="Where I've worked and what I worked on."
    >
      <div className="grid gap-6">
        {experience.map((role) => (
          <article
            key={`${role.org}-${role.role}`}
            className="surface-depth group rounded-2xl border border-border bg-card/20 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card/35 md:p-10"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                  {role.role}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {role.org} — {role.location}
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {role.period}
              </span>
            </div>

            <ul className="mt-7 space-y-3 border-t border-border pt-6">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Journey() {
  return (
    <Section
      id="journey"
      index="05"
      title="Journey"
      lead="A scroll-driven map of the years, and what each one was made of."
    >
      <JourneyTimeline />
    </Section>
  );
}

export function Community() {
  return (
    <Section
      id="community"
      index="06"
      title={community.title}
      lead="A living network of builders, led from the centre."
    >
      <CommunityNetwork />
    </Section>
  );
}

export function Missions() {
  return (
    <Section
      id="missions"
      index="07"
      title="Missions"
      lead="Verified hackathons, events and bootcamps I've been part of."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {missions.map((mission, i) => (
          <MissionCard key={mission.title} mission={mission} index={i} />
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="08"
      title="Certifications"
      lead="Verified programs and simulations completed."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <CertificationCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </Section>
  );
}

const contactItems = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    label: "GitHub",
    value: "Srikanthkesani2",
    href: profile.socials.find((s) => s.label === "GitHub")?.href ?? "#",
    external: true,
    icon: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    value: "Kesani Srikanth Reddy",
    href: profile.socials.find((s) => s.label === "LinkedIn")?.href ?? "#",
    external: true,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A4 4 0 0 1 16 8z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Resume",
    value: "View / Download Resume",
    href: profile.resume.url,
    external: true,
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6M9 15l3 3 3-3" />
      </>
    ),
  },
];

export function Contact() {
  return (
    <Section id="contact" index="09" title="Contact" lead="Ready when you are.">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/20 p-8 md:p-14 lg:p-20">
        {/* Ambient surface matching the hero */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-line" aria-hidden />
        <div
          className="pointer-events-none absolute -left-20 top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
          }}
          aria-hidden
        />

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

        <div className="relative">
          {/* Main statement */}
          <h3 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-foreground">
            BUILD SOMETHING
            <br />
            <span className="text-primary">WORTH SHIPPING.</span>
          </h3>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Have a project, internship or collaboration in mind? Send a message — or reach me
            directly.
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Vertical contact list */}
            <div className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group surface-depth flex items-center gap-4 rounded-xl border border-border bg-background/40 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:bg-primary/10">
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Message form */}
            <div className="rounded-2xl border border-border bg-background/40 p-6 backdrop-blur-sm md:p-8">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Contact me
              </h4>
              <p className="mb-6 mt-3 text-sm text-muted-foreground">
                Send a message and it lands straight in my inbox.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          {profile.domain}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} — Built and maintained by {profile.name}
        </span>
      </div>
    </footer>
  );
}
