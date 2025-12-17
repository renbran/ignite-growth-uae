import { useEffect, useRef, useCallback } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let time = 0;

    // Cyan/electric blue palette only
    const smokeColors = [
      { r: 0, g: 255, b: 240 },     // electric-cyan
      { r: 79, g: 195, b: 247 },    // sky-blue
      { r: 0, g: 200, b: 255 },     // bright cyan
      { r: 100, g: 220, b: 255 },   // light electric blue
    ];

    interface SmokeTrail {
      x: number;
      y: number;
      radius: number;
      color: typeof smokeColors[0];
      alpha: number;
      decay: number;
      vx: number;
      vy: number;
    }

    interface ClickRing {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: typeof smokeColors[0];
    }

    const trails: SmokeTrail[] = [];
    const clickRings: ClickRing[] = [];
    const maxTrails = 25;

    // Click handler for smoke rings
    const handleClick = (e: MouseEvent) => {
      const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
      for (let i = 0; i < 3; i++) {
        clickRings.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10 + i * 20,
          maxRadius: 80 + i * 40,
          alpha: 0.4 - i * 0.1,
          color,
        });
      }
    };

    window.addEventListener("click", handleClick);

    const render = () => {
      time += 0.01;
      
      ctx.clearRect(0, 0, width, height);

      // Add smoke trails on hover (reduced intensity)
      if (mouseRef.current.active && trails.length < maxTrails) {
        const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
        trails.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 50,
          y: mouseRef.current.y + (Math.random() - 0.5) * 50,
          radius: 40 + Math.random() * 60, // 50% smaller
          color,
          alpha: 0.2 + Math.random() * 0.15, // Reduced intensity
          decay: 0.012 + Math.random() * 0.01,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
        });
      }

      // Update and draw trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i];
        
        trail.x += trail.vx + Math.sin(time + i) * 0.3;
        trail.y += trail.vy + Math.cos(time + i * 0.7) * 0.2;
        trail.alpha -= trail.decay;
        trail.radius += 0.3;

        if (trail.alpha <= 0) {
          trails.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, trail.radius
        );
        
        const { r, g, b } = trail.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${trail.alpha * 0.6})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${trail.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw click rings
      for (let i = clickRings.length - 1; i >= 0; i--) {
        const ring = clickRings[i];
        
        ring.radius += 3;
        ring.alpha -= 0.015;

        if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
          clickRings.splice(i, 1);
          continue;
        }

        const { r, g, b } = ring.color;
        ctx.globalCompositeOperation = "screen";
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ring.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        const glowGradient = ctx.createRadialGradient(
          ring.x, ring.y, ring.radius - 10,
          ring.x, ring.y, ring.radius + 10
        );
        glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${ring.alpha * 0.3})`);
        glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius + 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle cursor glow
      if (mouseRef.current.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 100
        );
        cursorGlow.addColorStop(0, "rgba(0, 255, 240, 0.08)");
        cursorGlow.addColorStop(0.5, "rgba(79, 195, 247, 0.04)");
        cursorGlow.addColorStop(1, "rgba(0, 255, 240, 0)");
        
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    if (!prefersReducedMotion) {
      cleanup = animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanup?.();
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation;
