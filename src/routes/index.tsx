import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { CustomCursor } from "@/components/CustomCursor";
import {
  About,
  Capabilities,
  Certifications,
  Community,
  Contact,
  Experience,
  Journey,
  Missions,
  Projects,
  SiteFooter,
} from "@/components/sections";


const title = "SRIKS.DEV — AI/ML Student & Full-Stack Developer";
const description =
  "Portfolio of Sriks: AI/ML student, full-stack developer, community builder and hackathon organizer. Projects, capabilities, journey and contact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Experience />

        <Journey />
        <Community />
        <Missions />
        <Certifications />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
