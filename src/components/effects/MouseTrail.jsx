import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !context || !finePointer.matches || reduceMotion.matches) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastX = -100;
    let lastY = -100;
    const lights = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      for (let index = lights.length - 1; index >= 0; index -= 1) {
        const light = lights[index];
        light.alpha -= light.decay;
        if (light.alpha <= 0) {
          lights.splice(index, 1);
          continue;
        }
        const gradient = context.createRadialGradient(
          light.x, light.y, 0, light.x, light.y, light.radius,
        );
        gradient.addColorStop(0, `rgba(${light.color}, ${light.alpha * 0.28})`);
        gradient.addColorStop(0.45, `rgba(${light.color}, ${light.alpha * 0.12})`);
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        context.beginPath();
        context.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
      }
      if (lights.length) frameId = window.requestAnimationFrame(render);
      else frameId = 0;
    };

    const handlePointerMove = (event) => {
      const distance = lastX === -100
        ? 0
        : Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance > 0) {
        const steps = Math.min(8, Math.max(1, Math.floor(distance / 14)));
        for (let index = 0; index < steps; index += 1) {
          const t = index / steps;
          lights.push({
            x: lastX + (event.clientX - lastX) * t,
            y: lastY + (event.clientY - lastY) * t,
            radius: Math.min(75, Math.max(42, distance * 0.8 + 35)),
            alpha: 1,
            decay: 0.045,
            color: index % 2 === 0 ? "56, 189, 248" : "14, 165, 233",
          });
        }
        if (lights.length > 120) lights.splice(0, lights.length - 120);
        if (!frameId) frameId = window.requestAnimationFrame(render);
      }
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const resetPointer = () => {
      lastX = -100;
      lastY = -100;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", resetPointer);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", resetPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="trail-canvas" aria-hidden="true" />;
}
