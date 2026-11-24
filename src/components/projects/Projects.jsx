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

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div ref={ref} className={`reveal mb-8 ${isVisible ? "is-visible" : ""}`}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <span className="mono-font text-xs font-semibold tracking-wider text-sky-400">
              01 / SELECTED WORK
            </span>
            <h2 className="brand-font mt-2 max-w-4xl text-2xl font-bold tracking-tight text-[#eef0f5] sm:text-3xl lg:text-4xl">
              Software, Systems & Engineering Projects
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#a3a9b8] sm:text-base">
              A comprehensive showcase across C++ socket programming, mobile augmented reality, full-stack web applications, and automated cloud deployments.
            </p>
          </div>
        </div>

        {loadState === "success" && (
          <div className="mt-8 flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <ProjectFilters
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
            <div className="flex items-center gap-3">
              <ProjectSearch value={searchValue} onChange={setSearchValue} />
            </div>
          </div>
        )}

        {loadState === "success" && (
          <div className="mt-4 flex items-center justify-between text-xs text-[#7a8296]">
            <span>
              Showing <strong className="font-semibold text-[#eef0f5]">{filteredProjects.length}</strong> of {projects.length} projects
            </span>
            {activeCategory !== "all" && (
              <span className="mono-font text-sky-400">Filtered: {formatCategory(activeCategory)}</span>
            )}
          </div>
        )}
      </div>

      {loadState === "success" && (
        <>
          {filteredProjects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={openProject}
                />
              ))}
            </div>
          ) : (
            <div className="card-panel flex min-h-[14rem] flex-col items-center justify-center p-8 text-center">
              <SearchX aria-hidden="true" size={28} className="text-[#7a8296]" />
              <h3 className="mt-3 text-base font-semibold text-[#eef0f5]">No projects matched your criteria</h3>
              <p className="mt-1 text-xs text-[#a3a9b8]">
                Try searching for another technology or reset the active filters.
              </p>
              <button
                type="button"
                className="secondary-button mt-4"
                onClick={() => {
                  setSearchValue("");
                  setActiveCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </>
      )}

      {loadState === "loading" && (
        <div className="card-panel p-10 text-center text-sm text-[#a3a9b8]" role="status">
          Loading project catalog…
        </div>
      )}

      {loadState === "error" && (
        <div className="card-panel border-rose-500/30 p-8 text-center" role="alert">
          <AlertCircle aria-hidden="true" size={24} className="mx-auto text-rose-400" />
          <h3 className="mt-2 text-base font-semibold text-[#eef0f5]">Failed to load projects</h3>
          <p className="mt-1 text-xs text-[#a3a9b8]">{errorMessage}</p>
          <button type="button" className="secondary-button mt-4" onClick={onRetry}>
            Retry loading
          </button>
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
