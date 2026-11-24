import { Search, X } from "lucide-react";

export default function ProjectSearch({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <Search
        aria-hidden="true"
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8296]"
      />
      <input
        id="project-search"
        type="search"
        className="search-field"
        placeholder="Filter by keyword or stack…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#7a8296] transition-colors hover:text-[#eef0f5]"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <X aria-hidden="true" size={14} />
        </button>
      )}
    </div>
  );
}
