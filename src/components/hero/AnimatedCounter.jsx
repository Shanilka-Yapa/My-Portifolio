import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value }) {
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setCount(value);
      return undefined;
    }

    let timerId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let current = 0;
        const step = Math.max(1, Math.ceil(value / 30));
        timerId = window.setInterval(() => {
          current = Math.min(value, current + step);
          setCount(current);
          if (current >= value) window.clearInterval(timerId);
        }, 24);
      },
      { threshold: 0.2 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearInterval(timerId);
    };
  }, [value]);

  return <span ref={counterRef}>{count}</span>;
}
