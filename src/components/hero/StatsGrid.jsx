import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import AnimatedCounter from "./AnimatedCounter.jsx";

export default function StatsGrid({ projectCount, focusAreaCount, skillCount }) {
  const stats = [
    {
      label: "Projects",
      value: projectCount,
      description: "Selected work across development, design, ML, and infrastructure.",
    },
    {
      label: "Focus areas",
      value: focusAreaCount,
      description: "Systems, frontend, UX, and cloud delivery.",
    },
    {
      label: "Skill groups",
      value: skillCount,
      description: "Languages, tools, frameworks, and data workflows.",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <article ref={ref} className={`stat-card reveal ${isVisible ? "is-visible" : ""}`}>
      <div className="work-meta">{stat.label}</div>
      <div className="mt-2 text-3xl font-bold text-white">
        <AnimatedCounter value={stat.value} />
      </div>
      <p className="mt-2 text-sm text-slate-400">{stat.description}</p>
    </article>
  );
}
