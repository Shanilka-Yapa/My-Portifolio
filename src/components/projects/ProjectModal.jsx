import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { formatCategory } from "./projectUtils.js";

export default function ProjectModal({ project, onClose, triggerRef }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [project, onClose, triggerRef]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="modal-panel max-h-[min(90vh,48rem)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="work-meta">
              {formatCategory(project.category)} · {project.status}
            </div>
            <h2 id="project-modal-title" className="brand-font mt-2 text-2xl font-bold text-white">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="ghost-button px-3 py-2"
            aria-label="Close project details"
            onClick={onClose}
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>
        <p id="project-modal-description" className="project-details mt-4 text-slate-300">
          {project.details}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span className="tag-pill" key={`${project.id}-modal-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={`${project.id}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          ))}
          <button type="button" className="ghost-button" onClick={onClose}>
            Back to work
          </button>
        </div>
      </section>
    </div>
  );
}
