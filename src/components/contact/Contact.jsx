import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../../data/profile.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div
        ref={ref}
        className={`card-panel reveal p-6 sm:p-8 lg:p-10 xl:p-12 ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] xl:grid-cols-[1.45fr_0.55fr] lg:items-center">
          <div>
            <span className="mono-font text-xs font-semibold tracking-wider text-sky-400">
              03 / CONTACT
            </span>
            <h2 className="brand-font mt-2 max-w-3xl text-2xl font-bold tracking-tight text-[#eef0f5] sm:text-3xl lg:text-4xl">
              Open to Engineering Internships & Opportunities
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a3a9b8] sm:text-base">
              I am actively seeking software engineering, low-level systems, or full-stack internship positions. If you are hiring or would like to discuss my technical projects, feel free to reach out directly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:max-w-sm lg:justify-self-end w-full">
            <a
              href={`mailto:${profile.email}`}
              className="primary-button justify-center text-sm"
            >
              <Mail aria-hidden="true" size={16} />
              <span>Email me directly</span>
            </a>

            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button justify-center text-sm"
              >
                <span>{link.label} Profile</span>
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
