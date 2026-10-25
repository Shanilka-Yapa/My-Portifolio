import { ArrowUpRight, Code } from "lucide-react";
import { formatCategory } from "./projectUtils.js";
import ProjectMedia from "./ProjectMedia.jsx";

export default function ProjectCard({
  project,
  stackIndex,
  direction,
  dragOffset,
  isActive,
  isAnimating,
  onOpen,
  onAdvance,
}) {
  const primaryLink = project.links[0];
  const subtitle =
    project.subtitle ??
    project.summary.split(/[.!?]/)[0].trim();
  const statusClass = project.status.toLowerCase().replaceAll(" ", "-");
  const cardStyle = {
    "--stack-index": stackIndex,
    "--drag-offset": `${dragOffset}px`,
    "--drag-rotation": `${dragOffset * 0.035}deg`,
    "--drag-opacity": Math.max(0.65, 1 - Math.abs(dragOffset) / 800),
    "--direction": direction,
  };

  return (
    <article
      className={`project-deck-card ${isActive ? "is-active" : "is-background"} ${isAnimating && isActive ? "is-exiting" : ""}`}
      style={cardStyle}
      aria-hidden={!isActive}
      aria-label={isActive ? `Open details for ${project.title}` : undefined}
      tabIndex={isActive ? 0 : -1}
      onClick={(event) => {
        if (!isActive) {
          onAdvance();
          return;
        }
        onOpen(project, event);
      }}
      onKeyDown={(event) => {
        if (isActive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen(project, event);
        }
      }}
    >
      <div className="project-card-media-wrap">
        <ProjectMedia media={project.media} title={project.title} priority={isActive} />
        <div className="project-media-overlay" aria-hidden="true" />
        <span className="project-card-index" aria-hidden="true">
          {String(stackIndex + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="project-card-content">
        <div className="project-card-heading">
          <div className="work-meta">{formatCategory(project.category)}</div>
          <Code aria-hidden="true" size={18} className="text-cyan-300" />
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-subtitle">{subtitle}</p>
        {project.category === "development" && project.status && (
          <span className={`status-pill status-${statusClass} project-card-status`}>
            {project.status}
          </span>
        )}
        <p className="project-card-description">{project.summary}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span className="tag-pill" key={`${project.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="work-actions project-card-actions">
          {primaryLink && (
            <a
              className="primary-button"
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              onClick={(event) => event.stopPropagation()}
            >
              {primaryLink.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
