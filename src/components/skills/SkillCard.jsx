import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function SkillCard({ skill }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <article
      ref={ref}
      className={`skill-card reveal ${isVisible ? "is-visible" : ""}`}
    >
      <div className="skill-head">
        <div>
          <h3 className="work-title text-lg">{skill.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{skill.note}</p>
        </div>
        <span className="skill-pill">{skill.level}%</span>
      </div>
      <div
        className="skill-track"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={skill.level}
      >
        <div className="skill-fill" style={{ "--skill-level": `${skill.level}%` }} />
      </div>
    </article>
  );
}
