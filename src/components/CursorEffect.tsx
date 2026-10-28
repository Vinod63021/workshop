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
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position references
  const mousePos = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
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

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-hover'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Spawn subtle pastel antigravity floating particle occasionally
      const now = performance.now();
      if (now - lastSpawnRef.current > 45 && particlesRef.current.length < 24) {
        lastSpawnRef.current = now;
        const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
        particlesRef.current.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 3,
          color,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5, // gentle upward floating drift (antigravity)
          alpha: 0.85,
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth animation loop
    let animId: number;
    const animate = () => {
      // Precision dot interpolation
      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;

      // Elastic ring lag (spring lerp)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

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
            p.alpha -= 0.022; // fade out gently

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

      // Update DOM element positions directly for maximum frame rate
      const dotEl = document.getElementById('cursor-dot');
      const ringEl = document.getElementById('cursor-ring');
      const glowEl = document.getElementById('cursor-glow');

      if (dotEl) {
        dotEl.style.transform = `translate3d(${dotPos.current.x - 4}px, ${
          dotPos.current.y - 4
        }px, 0)`;
      }

      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringPos.current.x - 18}px, ${
          ringPos.current.y - 18
        }px, 0)`;
      }

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
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
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
          bg-gradient-to-tr from-[#4285F4]/20 via-[#FBBC04]/20 to-[#34A853]/20 
          dark:from-blue-600/15 dark:via-indigo-500/15 dark:to-cyan-400/15"
        style={{ transform: 'translate3d(-500px, -500px, 0)' }}
      />

      {/* 2. Floating Antigravity Pastel Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* 3. Smooth Precision Cursor Dot */}
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 transition-[opacity,transform] duration-75 will-change-transform 
          bg-[#1A73E8] dark:bg-cyan-400 shadow-sm shadow-blue-500/50"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* 4. Elastic Trailing Magnetic Ring */}
      <div
        id="cursor-ring"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform flex items-center justify-center ${
          isHovering
            ? 'w-12 h-12 -ml-3 -mt-3 bg-blue-500/15 border-2 border-[#1A73E8] dark:border-cyan-400 shadow-md shadow-blue-500/20'
            : isClicking
            ? 'w-7 h-7 bg-blue-500/25 border-2 border-[#4285F4] dark:border-cyan-300'
            : 'w-9 h-9 border border-[#4285F4]/70 dark:border-cyan-400/60 bg-transparent'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}

