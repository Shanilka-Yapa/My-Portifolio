import AnimatedCounter from "./AnimatedCounter.jsx";

export default function StatsGrid({ projectCount, focusAreaCount, skillCount }) {
  const stats = [
    {
      label: "Selected projects",
      value: projectCount,
      note: "Systems, web, mobile, ML",
    },
    {
      label: "Engineering domains",
      value: focusAreaCount,
      note: "From hardware to cloud",
    },
    {
      label: "Technologies",
      value: skillCount,
      note: "Across 6 categories",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-white/[0.06] bg-[#11141c]/60 p-3 sm:p-4"
        >
          <div className="brand-font text-2xl font-bold tabular-nums text-[#eef0f5] sm:text-3xl">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="mt-1 text-xs font-medium text-[#eef0f5] sm:text-sm">
            {stat.label}
          </div>
          <div className="mt-0.5 hidden text-xs text-[#7a8296] sm:block">
            {stat.note}
          </div>
        </div>
      ))}
    </div>
  );
}
