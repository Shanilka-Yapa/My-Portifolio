import { Search, X } from "lucide-react";

export default function ProjectSearch({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <Search
        aria-hidden="true"
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        id="project-search"
        type="search"
        className="search-input pl-11 pr-12"
        placeholder="Search by title, tag, or keyword"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:text-white"
          aria-label="Clear project search"
          onClick={() => onChange("")}
        >
          <X aria-hidden="true" size={16} />
        </button>
      )}
    </div>
  );
}
