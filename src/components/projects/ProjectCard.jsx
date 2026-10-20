import {
  ArrowUpRight,
  Baby,
  BrainCircuit,
  Code,
  FolderClosed,
  GraduationCap,
  LayoutTemplate,
  MapPin,
  MonitorSmartphone,
  Server,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { formatCategory, getProjectIcon } from "./projectUtils.js";

const icons = {
  MapPin,
  ShieldAlert,
  GraduationCap,
  MonitorSmartphone,
  Baby,
  LayoutTemplate,
  Server,
  Users,
  FolderClosed,
  BrainCircuit,
  Code,
};

export default function ProjectCard({ project, onOpen }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = icons[getProjectIcon(project.icon)] ?? Code;
  const primaryLink = project.links[0];
  const statusClass = project.status.toLowerCase().replaceAll(" ", "-");

  return (
    <article
      ref={ref}
      className={`work-card reveal flex h-full flex-col ${isVisible ? "is-visible" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Icon aria-hidden="true" size={20} />
          </span>
          <div className="min-w-0">
            <div className="work-meta">{formatCategory(project.category)}</div>
            <h3 className="work-title mt-1 break-words">{project.title}</h3>
          </div>
        </div>
        <span className={`status-pill status-${statusClass} shrink-0`}>
          {project.status}
        </span>
      </div>

      <p className="work-copy mt-4 flex-1">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span className="tag-pill" key={`${project.id}-${tag}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="work-actions">
        <button type="button" className="ghost-button" onClick={(event) => onOpen(project, event.currentTarget)}>
          View details
          <ArrowUpRight aria-hidden="true" size={16} />
        </button>
        {primaryLink && (
          <a
            className="primary-button"
            href={primaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {primaryLink.label}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
