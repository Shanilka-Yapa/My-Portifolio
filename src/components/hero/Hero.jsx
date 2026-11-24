import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "../../data/profile.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import ProfileCard from "./ProfileCard.jsx";
import StatsGrid from "./StatsGrid.jsx";

export default function Hero({ projectCount, skillCount }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="home" className="relative scroll-mt-24 py-10 sm:py-16 lg:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1.28fr_0.72fr] xl:grid-cols-[1.35fr_0.65fr] lg:gap-14 xl:gap-16">
        <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-[#11141c] px-3 py-1.5 text-xs text-[#a3a9b8]">
            <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />
            <span className="font-medium text-[#eef0f5]">{profile.availability}</span>
            <span className="text-white/20" aria-hidden="true">/</span>
            <span className="mono-font text-[#7a8296]">{profile.university}</span>
          </div>

          <h1 className="brand-font max-w-4xl text-3xl font-bold tracking-tight text-[#eef0f5] sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-[1.12]">
            {profile.headline}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a3a9b8] sm:text-lg">
            {profile.subhead}
          </p>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Core focus areas">
            {profile.focusAreas.map((area) => (
              <span key={area} className="tag-chip">
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="primary-button">
              View projects
              <ArrowDown aria-hidden="true" size={16} />
            </a>
            <a
              href={profile.cv}
              download="cv - yapa y.h.s.t.pdf"
              className="secondary-button"
            >
              <Download aria-hidden="true" size={16} />
              Download CV
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#a3a9b8]">
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#eef0f5]"
              >
                <SocialIcon name={link.label} />
                <span>{link.label}</span>
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#eef0f5]"
            >
              <Mail aria-hidden="true" size={15} />
              <span>Email</span>
            </a>
          </div>

          <div className="mt-10 max-w-3xl border-t border-white/[0.06] pt-6">
            <StatsGrid
              projectCount={projectCount}
              focusAreaCount={profile.focusAreas.length}
              skillCount={skillCount}
            />
          </div>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}

function SocialIcon({ name }) {
  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.48v-1.68c-2.78.62-3.37-1.34-3.37-1.34-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.38-2.04 1.01-2.76-.1-.26-.44-1.31.1-2.73 0 0 .83-.27 2.7 1.05a9.11 9.11 0 0 1 4.92 0c1.87-1.32 2.7-1.05 2.7-1.05.54 1.42.2 2.47.1 2.73.63.72 1.01 1.64 1.01 2.76 0 3.95-2.35 4.81-4.58 5.06.36.32.68.96.68 1.93v2.86c0 .27.18.58.69.48A10.06 10.06 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5ZM.3 8.98h4.4V24H.3V8.98ZM8.98 8.98h4.22v2.05h.06c.59-1.12 2.05-2.3 4.22-2.3 4.52 0 5.36 2.97 5.36 6.84V24h-4.4v-6.76c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.59 1.75-2.59 3.56V24h-4.63V8.98Z" />
    </svg>
  );
}
