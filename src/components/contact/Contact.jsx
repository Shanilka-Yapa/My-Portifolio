import { Mail } from "lucide-react";
import { profile } from "../../data/profile.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" className="scroll-mt-24 py-18 sm:py-24">
      <div ref={ref} className={`contact-card reveal rounded-[1.75rem] p-6 sm:p-10 lg:p-12 ${isVisible ? "is-visible" : ""}`}>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="work-meta">03. Contact</div>
            <h2 className="brand-font mt-3 text-3xl font-bold text-white sm:text-4xl 2xl:text-5xl">
              Want a version of this portfolio tailored to a specific role?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400 lg:text-lg">
              I can adapt this layout for internships, freelance work, or a job application, and connect it to a CMS or form backend later if needed.
            </p>
          </div>
          <div className="grid gap-3">
            <a href={`mailto:${profile.email}`} className="primary-button justify-center">
              Email me
              <Mail aria-hidden="true" size={16} />
            </a>
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button justify-center"
              >
                <SocialIcon name={link.label} />
                {link.label} profile
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ name }) {
  return name === "GitHub" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.48v-1.68c-2.78.62-3.37-1.34-3.37-1.34-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.38-2.04 1.01-2.76-.1-.26-.44-1.31.1-2.73 0 0 .83-.27 2.7 1.05a9.11 9.11 0 0 1 4.92 0c1.87-1.32 2.7-1.05 2.7-1.05.54 1.42.2 2.47.1 2.73.63.72 1.01 1.64 1.01 2.76 0 3.95-2.35 4.81-4.58 5.06.36.32.68.96.68 1.93v2.86c0 .27.18.58.69.48A10.06 10.06 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5ZM.3 8.98h4.4V24H.3V8.98ZM8.98 8.98h4.22v2.05h.06c.59-1.12 2.05-2.3 4.22-2.3 4.52 0 5.36 2.97 5.36 6.84V24h-4.4v-6.76c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.59 1.75-2.59 3.56V24h-4.63V8.98Z" />
    </svg>
  );
}
