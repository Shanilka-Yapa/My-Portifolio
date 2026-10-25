import { formatCategory } from "./projectUtils.js";

export default function ProjectFilters({ categories, activeCategory, onChange }) {
  return (
    <div className="reveal mb-6 flex flex-wrap gap-3 is-visible" aria-label="Filter projects by category">
      <button
        type="button"
        className={`filter-pill ${activeCategory === "all" ? "active" : ""}`}
        aria-pressed={activeCategory === "all"}
        onClick={() => onChange("all")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter-pill ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          onClick={() => onChange(category)}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
