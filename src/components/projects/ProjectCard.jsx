import { ArrowUpRight, FileText } from "lucide-react";
import { formatCategory } from "./projectUtils.js";
import ProjectMedia from "./ProjectMedia.jsx";

export default function ProjectCard({ project, onOpen }) {
  const primaryLink = project.links?.[0];
  const statusClass = (project.status || "ongoing").toLowerCase().replaceAll(" ", "-");

  return (
    <article className="project-card flex flex-col justify-between">
      <div>
        <div className="project-media-box">
          <ProjectMedia media={project.media} title={project.title} />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="tag-chip text-xs">
              {formatCategory(project.category)}
            </span>
            {project.status && (
              <span className={`status-badge ${statusClass}`}>
                {project.status}
              </span>
            )}
          </div>

          <h3 className="brand-font mt-3 text-lg font-bold text-[#eef0f5] sm:text-xl">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#a3a9b8]">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Project technologies">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={`${project.id}-${tag}`} className="tag-chip text-[11px]">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="mono-font text-[11px] text-[#7a8296] self-center pl-1">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#11141c]/50 px-5 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#a3a9b8] transition-colors hover:text-[#eef0f5]"
        >
          <FileText size={14} aria-hidden="true" />
          <span>Read details</span>
        </button>

        {primaryLink && (
          <a
            href={primaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 transition-colors hover:text-sky-300"
          >
            <span>{primaryLink.label}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
