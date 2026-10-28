'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

// Iconic Google Antigravity Pastel Palette
const PASTEL_COLORS = [
  '#4285F4', // Google Blue
  '#EA4335', // Google Red
  '#FBBC04', // Google Yellow
  '#34A853', // Google Green
  '#A142F4', // Google Purple
];

export default function CursorEffect() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Position references
  const mousePos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });

  // Canvas ref for subtle antigravity floating particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn subtle pastel antigravity floating particle occasionally
      const now = performance.now();
      if (now - lastSpawnRef.current > 40 && particlesRef.current.length < 20) {
        lastSpawnRef.current = now;
        const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
        particlesRef.current.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.4, // gentle upward floating drift (antigravity)
          alpha: 0.75,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth animation loop
    let animId: number;
    const animate = () => {
      // Ambient spotlight lag (smooth slow glide)
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      // Update particle canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const nextParticles: Particle[] = [];
          for (let i = 0; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.024; // fade out gently

            if (p.alpha > 0.01) {
              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
              nextParticles.push(p);
            }
          }
          particlesRef.current = nextParticles;
        }
      }

      // Update ambient spotlight position
      const glowEl = document.getElementById('cursor-glow');
      if (glowEl) {
        glowEl.style.transform = `translate3d(${glowPos.current.x - 220}px, ${
          glowPos.current.y - 220
        }px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize canvas on window resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* 1. Ambient Mouse Spotlight (Dreamy Google Pastel in Light mode, Indigo/Cyan in Dark mode) */}
      <div
        id="cursor-glow"
        className="fixed top-0 left-0 w-[440px] h-[440px] rounded-full pointer-events-none -z-0 opacity-70 transition-opacity duration-500 will-change-transform blur-[100px] 
          bg-gradient-to-tr from-[#4285F4]/15 via-[#FBBC04]/15 to-[#34A853]/15 
          dark:from-blue-600/15 dark:via-indigo-500/15 dark:to-cyan-400/15"
        style={{ transform: 'translate3d(-500px, -500px, 0)' }}
      />

      {/* 2. Floating Antigravity Pastel Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
}
