import { useEffect, useRef, useCallback } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let time = 0;

    // Brand colors for smoke effect
    const smokeColors = [
      { r: 0, g: 255, b: 240, a: 0.15 },    // electric-cyan
      { r: 79, g: 195, b: 247, a: 0.12 },   // sky-blue
      { r: 30, g: 58, b: 138, a: 0.1 },     // ocean-blue
      { r: 0, g: 255, b: 136, a: 0.08 },    // neon-green accent
      { r: 147, g: 51, b: 234, a: 0.06 },   // purple accent
    ];

    // Smoke particles with organic movement
    interface SmokeParticle {
      x: number;
      y: number;
      radius: number;
      color: typeof smokeColors[0];
      speedX: number;
      speedY: number;
      noiseOffsetX: number;
      noiseOffsetY: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: SmokeParticle[] = [];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 150 + Math.random() * 350,
        color: smokeColors[i % smokeColors.length],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    // Simple noise function for organic movement
    const noise = (x: number, y: number, t: number) => {
      return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) * 
             Math.sin((x + y) * 0.005 + t * 0.5);
    };

    const render = () => {
      time += 0.008;
      
      // Clear with dark background
      ctx.fillStyle = "rgba(12, 30, 52, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw smoke particles
      particles.forEach((particle) => {
        // Organic noise-based movement
        const noiseX = noise(particle.noiseOffsetX, particle.noiseOffsetY, time);
        const noiseY = noise(particle.noiseOffsetY, particle.noiseOffsetX, time * 1.1);
        
        particle.x += particle.speedX + noiseX * 2;
        particle.y += particle.speedY + noiseY * 2;

        // Mouse interaction - smoke flows away from cursor
        const dx = mouseRef.current.x * width - particle.x;
        const dy = mouseRef.current.y * height - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 400;
          particle.x -= dx * force * 0.02;
          particle.y -= dy * force * 0.02;
        }

        // Wrap around edges smoothly
        if (particle.x < -particle.radius) particle.x = width + particle.radius;
        if (particle.x > width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = height + particle.radius;
        if (particle.y > height + particle.radius) particle.y = -particle.radius;

        // Pulsing effect
        particle.pulse += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;
        const currentRadius = particle.radius * pulseScale;

        // Draw smoke blob with multiple gradient layers
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius
        );
        
        const { r, g, b, a } = particle.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a * 1.5})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${a})`);
        gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${a * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add flowing light streaks
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 3; i++) {
        const streakX = width * 0.5 + Math.sin(time * 0.5 + i * 2) * width * 0.4;
        const streakY = height * 0.5 + Math.cos(time * 0.3 + i * 2.5) * height * 0.3;
        
        const streakGradient = ctx.createRadialGradient(
          streakX, streakY, 0,
          streakX, streakY, 200
        );
        streakGradient.addColorStop(0, "rgba(0, 255, 240, 0.08)");
        streakGradient.addColorStop(0.5, "rgba(79, 195, 247, 0.04)");
        streakGradient.addColorStop(1, "rgba(0, 255, 240, 0)");
        
        ctx.fillStyle = streakGradient;
        ctx.beginPath();
        ctx.arc(streakX, streakY, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      animationRef.current = requestAnimationFrame(render);
    };

    render();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static fallback
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgb(12, 30, 52)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-30 pointer-events-none"
      aria-hidden="true"
      style={{ background: "rgb(12, 30, 52)" }}
    />
  );
};

export default BackgroundAnimation;
