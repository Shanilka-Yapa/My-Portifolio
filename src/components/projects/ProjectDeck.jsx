import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";

const DRAG_THRESHOLD = 60;

function wrapIndex(index, length) {
  return (index + length) % length;
}

export default function ProjectDeck({ projects, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);
  const animationTimer = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    window.clearTimeout(animationTimer.current);
    setActiveIndex(0);
    setDragOffset(0);
    setIsDragging(false);
    setIsAnimating(false);
  }, [projects]);

  useEffect(() => () => window.clearTimeout(animationTimer.current), []);

  const navigate = useCallback(
    (step) => {
      if (projects.length < 2 || isAnimating) return;
      setDirection(step);
      setIsAnimating(true);
      setDragOffset(0);
      animationTimer.current = window.setTimeout(() => {
        setActiveIndex((current) => wrapIndex(current + step, projects.length));
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating, projects.length],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
    };

    const deck = deckRef.current;
    deck?.addEventListener("keydown", handleKeyDown);
    return () => deck?.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const visibleProjects = useMemo(() => {
    return projects.slice(0, Math.min(projects.length, 4)).map((_, stackIndex) => ({
      project: projects[wrapIndex(activeIndex + stackIndex, projects.length)],
      stackIndex,
    }));
  }, [activeIndex, projects]);

  const handlePointerDown = (event) => {
    if (isAnimating || event.button > 0) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) return;
    const offset = event.clientX - pointerStart.current.x;
    setDragOffset(offset);
    if (Math.abs(offset) > 8) suppressClick.current = true;
  };

  const handlePointerEnd = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) return;
    const offset = dragOffset;
    pointerStart.current = null;
    setIsDragging(false);
    if (Math.abs(offset) >= DRAG_THRESHOLD) {
      navigate(offset < 0 ? 1 : -1);
    } else {
      setDragOffset(0);
    }
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const handleCardClick = (project, event) => {
    if (suppressClick.current || event.target.closest("a, button")) return;
    onOpen(project, event.currentTarget);
  };

  if (!projects.length) return null;

  return (
    <div className="project-deck-shell">
      {projects.length > 1 && (
        <button
          type="button"
          className="deck-navigation deck-navigation-previous"
          aria-label="Show previous project"
          onClick={() => navigate(-1)}
          disabled={isAnimating}
        >
          <ArrowLeft aria-hidden="true" size={20} />
        </button>
      )}
      <div
        ref={deckRef}
        className={`project-deck ${isDragging ? "is-dragging" : ""}`}
        tabIndex={0}
        aria-label="Project gallery. Use the arrow keys to navigate."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {visibleProjects.map(({ project, stackIndex }) => (
          <ProjectCard
            key={project.id}
            project={project}
            stackIndex={stackIndex}
            direction={direction}
            dragOffset={stackIndex === 0 ? dragOffset : 0}
            isActive={stackIndex === 0}
            isAnimating={isAnimating}
            onOpen={handleCardClick}
            onAdvance={() => navigate(1)}
          />
        ))}
      </div>
      {projects.length > 1 && (
        <button
          type="button"
          className="deck-navigation deck-navigation-next"
          aria-label="Show next project"
          onClick={() => navigate(1)}
          disabled={isAnimating}
        >
          <ArrowRight aria-hidden="true" size={20} />
        </button>
      )}
    </div>
  );
}
