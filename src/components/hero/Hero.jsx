import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "../../data/profile.js";
import { useTypingEffect } from "../../hooks/useTypingEffect.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import StatsGrid from "./StatsGrid.jsx";
import ProfileCard from "./ProfileCard.jsx";

export default function Hero({ projectCount, skillCount }) {
  const typedRole = useTypingEffect(profile.roleMessages);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden py-8 lg:py-16">
      <div className="hero-orb one" aria-hidden="true" />
      <div className="hero-orb two" aria-hidden="true" />
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] xl:gap-16 2xl:gap-20">
        <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
            {profile.availability}
          </div>

          <h1 className="brand-font text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl 2xl:text-8xl">
            {profile.heroHeadline}
            <span className="gradient-text block">{profile.heroHighlight}</span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="skill-pill">
              <Sparkles aria-hidden="true" size={16} />
              <span aria-live="polite" aria-atomic="true">{typedRole}</span>
            </span>
            <span className="skill-pill">{profile.university}</span>
            <span className="skill-pill">Problem solving</span>
          </div>

          <StatsGrid
            projectCount={projectCount}
            focusAreaCount={profile.focusAreas.length}
            skillCount={skillCount}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="primary-button">
              View work
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href={profile.cv} download="cv - yapa y.h.s.t.pdf" className="ghost-button">
              Download CV
              <Download aria-hidden="true" size={16} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            {profile.socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="action-link">
                <SocialIcon name={link.label} />
                {link.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="action-link">
              <Mail aria-hidden="true" size={16} />
              Email
            </a>
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
