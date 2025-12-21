import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const SmokeAurora: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout>();
  const [isActive, setIsActive] = useState(true);
  const [opacity, setOpacity] = useState(1);

  // Premium gradient color palette with vibrant aurora colors
  const colorPalette = [
    { h: 199, s: 100, l: 60 }, // Sky blue
    { h: 180, s: 100, l: 50 }, // Cyan
    { h: 210, s: 100, l: 45 }, // Navy blue
    { h: 200, s: 100, l: 55 }, // Ocean blue
    { h: 180, s: 95, l: 48 },  // Electric cyan
    { h: 220, s: 100, l: 52 }, // Deep electric blue
    { h: 190, s: 100, l: 58 }, // Premium cyan
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsActive(true);
      setOpacity(1);

      // Clear previous inactivity timeout
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      // Set new inactivity timeout - fade out after 1 second of no movement
      inactivityTimeoutRef.current = setTimeout(() => {
        setIsActive(false);
        setOpacity(0);
      }, 1000);

      // Spawn new particles - only spawn if active
      const now = Date.now();
      if (now - lastSpawnRef.current > 15) {
        // Spawn 1-2 particles per spawn event (reduced for 50% smaller effect)
        const particleCount = Math.random() > 0.5 ? 1 : 2;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.random() * Math.PI * 2);
          const velocity = 0.5 + Math.random() * 1.5;

          const newParticle: Particle = {
            id: Date.now() + i,
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1,
            maxLife: 2000 + Math.random() * 1000,
            size: 2 + Math.random() * 5, // 50% smaller (was 5-15, now 2-7)
            hue: colorPalette[Math.floor(Math.random() * colorPalette.length)].h,
          };

          particlesRef.current.push(newParticle);
        }
        lastSpawnRef.current = now;
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setOpacity(0);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const particles = particlesRef.current;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Calculate age
        const age = Math.min((now - particle.id) / particle.maxLife, 1);
        particle.life = 1 - age;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply gravity and drag
        particle.vy += 0.15; // Subtle gravity
        particle.vx *= 0.98; // Drag
        particle.vy *= 0.97; // Drag

        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with premium gradient mixing
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        // Create premium aurora colors with gradient mix
        const currentColor = colorPalette.find(c => c.h === particle.hue) || colorPalette[0];
        const nextColorIndex = (colorPalette.indexOf(currentColor) + 1) % colorPalette.length;
        const nextColor = colorPalette[nextColorIndex];

        const outerAlpha = particle.life * 0.2;
        const innerAlpha = particle.life * 0.4;
        const midAlpha = particle.life * 0.25;

        // Premium gradient with color mixing
        gradient.addColorStop(
          0,
          `hsla(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%, ${innerAlpha})`
        );
        gradient.addColorStop(
          0.4,
          `hsla(${nextColor.h}, ${nextColor.s}%, ${Math.max(nextColor.l - 5, 45)}%, ${midAlpha})`
        );
        gradient.addColorStop(
          0.7,
          `hsla(${currentColor.h}, ${currentColor.s}%, ${Math.max(currentColor.l - 15, 35)}%, ${outerAlpha * 0.7})`
        );
        gradient.addColorStop(1, `hsla(${nextColor.h}, ${nextColor.s}%, ${Math.max(nextColor.l - 25, 25)}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size,
          particle.y - particle.size,
          particle.size * 2,
          particle.size * 2
        );
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen',
        opacity: opacity,
      }}
    />
  );
};

export default SmokeAurora;
