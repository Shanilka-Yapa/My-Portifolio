import {
  Cloud,
  Code2,
  Database,
  Layout,
  Server,
  Wrench,
} from "lucide-react";
import { skillCategories } from "../../data/skills.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import SkillCard from "./SkillCard.jsx";

const CATEGORY_ICONS = {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
};

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div ref={ref} className={`reveal mb-8 ${isVisible ? "is-visible" : ""}`}>
        <span className="mono-font text-xs font-semibold tracking-wider text-sky-400">
          02 / TECHNICAL STACK
        </span>
        <h2 className="brand-font mt-2 max-w-4xl text-2xl font-bold tracking-tight text-[#eef0f5] sm:text-3xl lg:text-4xl">
          Technologies & Engineering Categories
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#a3a9b8] sm:text-base">
          A structured catalog of programming languages, frameworks, databases, and infrastructure tools applied across my projects and coursework.
        </p>
      </div>

      {/* 6 Category Panels in a 3-column / 2-column grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
        {skillCategories.map((group) => {
          const CategoryIcon = CATEGORY_ICONS[group.icon] ?? Code2;

          return (
            <div
              key={group.id}
              className="card-panel flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-[#1a1e28] text-sky-400"
                      aria-hidden="true"
                    >
                      <CategoryIcon size={15} />
                    </div>
                    <h3 className="brand-font text-base font-bold text-[#eef0f5]">
                      {group.title}
                    </h3>
                  </div>
                  <span className="mono-font text-[11px] text-[#7a8296]">
                    {group.skills.length} tools
                  </span>
                </div>

                <p className="mt-2.5 text-xs text-[#a3a9b8]">
                  {group.description}
                </p>

                <div className="mt-4 space-y-2">
                  {group.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Methodology Banner */}
      <div className="mt-8">
        <HowIWorkCard />
      </div>
    </section>
  );
}

function HowIWorkCard() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`card-panel reveal p-6 sm:p-7 xl:p-8 ${isVisible ? "is-visible" : ""}`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="mono-font text-xs font-semibold tracking-wider text-[#7a8296]">
            ENGINEERING WORKFLOW
          </span>
          <h3 className="brand-font mt-1.5 text-lg font-bold text-[#eef0f5] sm:text-xl">
            Methodology & Technical Approach
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#a3a9b8]">
            I build through systematic iterations: start from the data schema or communication protocol, build a resilient core, and then layer clean user interfaces and interaction flows on top.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-[#1a1e28]/40 p-3.5">
            <div className="mono-font text-[11px] text-[#7a8296]">EXECUTION PIPELINE</div>
            <p className="mt-1 text-xs font-medium text-[#eef0f5]">
              Architecture plan → Core implementation → Boundary testing → UI refinement
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#1a1e28]/40 p-3.5">
            <div className="mono-font text-[11px] text-[#7a8296]">CORE PRINCIPLE</div>
            <p className="mt-1 text-xs font-medium text-[#eef0f5]">
              Clarity of implementation and robust fundamentals over superficial decoration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
