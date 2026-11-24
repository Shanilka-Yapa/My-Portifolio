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
      <div
        ref={dialogRef}
        className="modal-dialog max-h-[min(90vh,46rem)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="mono-font text-xs text-sky-400">
                {formatCategory(project.category)}
              </span>
              <span className="text-white/20">/</span>
              <span className="mono-font text-xs text-[#a3a9b8]">
                {project.status}
              </span>
            </div>
            <h2 id="project-modal-title" className="brand-font mt-1.5 text-2xl font-bold text-[#eef0f5]">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-lg border border-white/[0.08] bg-[#1a1e28] p-2 text-[#a3a9b8] transition-colors hover:text-[#eef0f5]"
            aria-label="Close project details"
            onClick={onClose}
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h3 className="mono-font text-xs font-semibold text-[#7a8296]">OVERVIEW</h3>
            <p id="project-modal-description" className="mt-2 text-sm leading-relaxed text-[#eef0f5] whitespace-pre-line">
              {project.details}
            </p>
          </div>

          <div>
            <h3 className="mono-font text-xs font-semibold text-[#7a8296]">TECHNOLOGIES & TOOLS</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span className="tag-chip" key={`${project.id}-modal-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={`${project.id}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button text-xs"
              >
                <span>{link.label}</span>
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="secondary-button text-xs"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
