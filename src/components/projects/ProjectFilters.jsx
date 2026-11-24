import { formatCategory } from "./projectUtils.js";

export default function ProjectFilters({ categories, activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by category">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === "all"}
        className={`filter-chip ${activeCategory === "all" ? "active" : ""}`}
        onClick={() => onChange("all")}
      >
        All projects
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          className={`filter-chip ${activeCategory === category ? "active" : ""}`}
          onClick={() => onChange(category)}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
