import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const setRef = useCallback((node) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref: setRef, isVisible };
}
