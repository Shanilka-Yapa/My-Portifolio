import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import SkillCard from "./SkillCard.jsx";

export default function Skills({ skills }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="skills" className="scroll-mt-24 py-18 sm:py-24">
      <div ref={ref} className={`reveal mb-8 ${isVisible ? "is-visible" : ""}`}>
        <div className="work-meta">02. Technical stack</div>
        <h2 className="brand-font mt-3 text-3xl font-bold text-white sm:text-4xl">
          Skills that support the portfolio
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] xl:gap-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
        <HowIWorkCard />
      </div>
    </section>
  );
}

function HowIWorkCard() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`contact-card reveal flex flex-col justify-between rounded-[1.5rem] p-6 lg:p-8 ${isVisible ? "is-visible" : ""}`}>
      <div>
        <div className="work-meta">How I work</div>
        <h3 className="brand-font mt-3 text-2xl font-bold text-white">
          Practical, iterative, and visual
        </h3>
        <p className="mt-4 leading-8 text-slate-400">
          I like building in small slices: define the data, render the UI from that data, then layer motion and interaction on top. That approach keeps the portfolio easy to maintain and easier to expand.
        </p>
      </div>
      <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
        <div className="stat-card">
          <div className="work-meta">Workflow</div>
          <p className="mt-2">Plan, build, test, refine</p>
        </div>
        <div className="stat-card">
          <div className="work-meta">Priority</div>
          <p className="mt-2">Clarity over clutter</p>
        </div>
      </div>
    </div>
  );
}
