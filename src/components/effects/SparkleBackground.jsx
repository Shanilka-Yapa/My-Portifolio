import { useEffect, useRef } from "react";

export default function SparkleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let frameId;
    let width = 0;
    let height = 0;
    let particles = [];
    const colors = ["56, 189, 248", "168, 85, 247", "224, 242, 254"];

    const resize = () => {
      window.cancelAnimationFrame(frameId);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = coarsePointer.matches
        ? 0
        : Math.min(50, Math.floor((width * height) / 24000));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[index % colors.length],
      }));
      draw(reduceMotion.matches);
    };

    const draw = (staticFrame = false) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        if (!staticFrame) {
          particle.phase += particle.speed;
          particle.x = (particle.x + particle.vx + width) % width;
          particle.y = (particle.y + particle.vy + height) % height;
        }
        const alpha = staticFrame
          ? particle.baseAlpha
          : particle.baseAlpha + Math.sin(particle.phase) * particle.baseAlpha * 0.7;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.color}, ${Math.max(0, alpha)})`;
        context.shadowBlur = 6;
        context.shadowColor = `rgba(${particle.color}, 0.8)`;
        context.fill();
      });
      context.shadowBlur = 0;
      if (!staticFrame && particles.length) {
        frameId = window.requestAnimationFrame(() => draw());
      } else {
        frameId = 0;
      }
    };

    const handleMotionChange = () => {
      window.cancelAnimationFrame(frameId);
      draw(reduceMotion.matches);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    reduceMotion.addEventListener("change", handleMotionChange);
    coarsePointer.addEventListener("change", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      reduceMotion.removeEventListener("change", handleMotionChange);
      coarsePointer.removeEventListener("change", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="sparkle-canvas" aria-hidden="true" />;
}
