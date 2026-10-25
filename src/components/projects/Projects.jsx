import { useCallback, useMemo, useRef, useState } from "react";
import { AlertCircle, SearchX } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectFilters from "./ProjectFilters.jsx";
import ProjectModal from "./ProjectModal.jsx";
import ProjectSearch from "./ProjectSearch.jsx";
import { formatCategory } from "./projectUtils.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function Projects({ projects, loadState, errorMessage, onRetry }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const triggerRef = useRef(null);
  const { ref, isVisible } = useScrollReveal();

  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const filteredProjects = useMemo(() => {
    const query = searchValue.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const searchableText = [
        project.title,
        project.category,
        formatCategory(project.category),
        project.status,
        project.summary,
        project.details,
        ...project.tags,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [projects, activeCategory, searchValue]);

  const openProject = (project, trigger) => {
    triggerRef.current = trigger;
    setSelectedProject(project);
  };
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="work" className="scroll-mt-24 py-18 sm:py-24">
      <div ref={ref} className={`reveal mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${isVisible ? "is-visible" : ""}`}>
        <div>
          <div className="work-meta">01. Selected work</div>
          <h2 className="brand-font mt-3 text-3xl font-bold text-white sm:text-4xl">
            A dynamic gallery of projects and design work
          </h2>
        </div>
        {loadState === "success" && (
          <ProjectSearch value={searchValue} onChange={setSearchValue} />
        )}
      </div>

      {loadState === "success" && (
        <>
          <ProjectFilters
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          <p className="mb-5 text-sm text-slate-400" aria-live="polite">
            Showing <span className="font-semibold text-slate-200">{filteredProjects.length}</span>{" "}
            of {projects.length} projects
          </p>
          {filteredProjects.length ? (
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={openProject} />
              ))}
            </div>
          ) : (
            <div className="empty-state glass-panel">
              <SearchX aria-hidden="true" size={24} className="text-cyan-300" />
              <h3 className="mt-3 font-semibold text-white">No projects match your search</h3>
              <p className="mt-1 text-sm text-slate-400">
                Try a different keyword or clear the selected filters.
              </p>
              <button
                type="button"
                className="ghost-button mt-4"
                onClick={() => {
                  setSearchValue("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      {loadState === "loading" && (
        <div className="glass-panel rounded-2xl p-8 text-center text-slate-300" role="status">
          Loading projects…
        </div>
      )}
      {loadState === "error" && (
        <div className="error-state glass-panel" role="alert">
          <AlertCircle aria-hidden="true" size={24} className="text-rose-300" />
          <h3 className="mt-3 font-semibold text-white">Projects could not be loaded</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{errorMessage}</p>
          <button type="button" className="ghost-button mt-4" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}
      {loadState === "success" && projects.length === 0 && (
        <div className="empty-state glass-panel" role="status">
          <p className="text-slate-300">No projects are currently listed in projects.json.</p>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        triggerRef={triggerRef}
      />
    </section>
  );
}
