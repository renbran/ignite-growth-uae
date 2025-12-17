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

    // Magenta-purple-blue-cyan gradient palette (from reference image)
    const smokeColors = [
      { r: 200, g: 0, b: 180 },     // magenta/pink
      { r: 148, g: 0, b: 211 },     // violet purple
      { r: 75, g: 0, b: 130 },      // indigo
      { r: 65, g: 105, b: 225 },    // royal blue
      { r: 0, g: 150, b: 255 },     // bright blue
      { r: 0, g: 220, b: 220 },     // cyan/turquoise
    ];

    // Particle trail for cursor
    interface CursorParticle {
      x: number;
      y: number;
      radius: number;
      color: typeof smokeColors[0];
      alpha: number;
      vx: number;
      vy: number;
    }

    const cursorParticles: CursorParticle[] = [];
    const maxCursorParticles = 40;

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

      // Add cursor particle trail
      if (mouseRef.current.active && cursorParticles.length < maxCursorParticles) {
        const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
        cursorParticles.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 10,
          y: mouseRef.current.y + (Math.random() - 0.5) * 10,
          radius: 2 + Math.random() * 4,
          color,
          alpha: 0.8 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        });
      }

      // Update and draw cursor particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        p.radius *= 0.98;

        if (p.alpha <= 0 || p.radius < 0.5) {
          cursorParticles.splice(i, 1);
          continue;
        }

        const { r, g, b } = p.color;
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Particle glow
        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        particleGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.4})`);
        particleGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = particleGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add smoke trails on hover (reduced intensity)
      if (mouseRef.current.active && trails.length < maxTrails) {
        const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
        trails.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 50,
          y: mouseRef.current.y + (Math.random() - 0.5) * 50,
          radius: 40 + Math.random() * 60,
          color,
          alpha: 0.2 + Math.random() * 0.15,
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

      // Cursor glow with gradient colors
      if (mouseRef.current.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 80
        );
        cursorGlow.addColorStop(0, "rgba(200, 0, 180, 0.1)");
        cursorGlow.addColorStop(0.4, "rgba(75, 0, 130, 0.06)");
        cursorGlow.addColorStop(0.7, "rgba(0, 150, 255, 0.04)");
        cursorGlow.addColorStop(1, "rgba(0, 220, 220, 0)");
        
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 80, 0, Math.PI * 2);
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
