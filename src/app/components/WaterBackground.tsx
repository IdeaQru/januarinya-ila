import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

export function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const animationFrameRef = useRef<number>();

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

    // Warm pink colors
    const colors = [
      'rgba(255, 182, 193, 0.6)', // Light pink
      'rgba(255, 160, 180, 0.6)', // Warm pink
      'rgba(255, 192, 203, 0.6)', // Pink
      'rgba(255, 150, 170, 0.6)', // Rose
      'rgba(255, 200, 210, 0.6)', // Soft pink
    ];

    // Create initial ambient particles
    const createAmbientParticles = () => {
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          life: 1,
          maxLife: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    createAmbientParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      // Calculate mouse velocity
      const dx = mouseRef.current.x - mouseRef.current.lastX;
      const dy = mouseRef.current.y - mouseRef.current.lastY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Create ripple effect
      if (velocity > 2) {
        wavesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          maxRadius: 100 + velocity * 2,
          life: 1,
          maxLife: 1,
        });

        // Create water splash particles
        const particleCount = Math.min(Math.floor(velocity / 2), 15);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * velocity * 0.3 + 2;
          particlesRef.current.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 4 + 2,
            life: 1,
            maxLife: 60 + Math.random() * 40,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    // Touch handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;

      const dx = mouseRef.current.x - mouseRef.current.lastX;
      const dy = mouseRef.current.y - mouseRef.current.lastY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 2) {
        wavesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          maxRadius: 100 + velocity * 2,
          life: 1,
          maxLife: 1,
        });

        const particleCount = Math.min(Math.floor(velocity / 2), 15);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * velocity * 0.3 + 2;
          particlesRef.current.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 4 + 2,
            life: 1,
            maxLife: 60 + Math.random() * 40,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Animation loop
    const animate = () => {
      // Create subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 240, 245, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 228, 235, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 218, 230, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update waves
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.radius += 3;
        wave.life -= 0.015;

        if (wave.life <= 0) return false;

        // Draw ripple
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 160, 180, ${wave.life * 0.3})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw inner ripple
        if (wave.radius > 20) {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius - 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 192, 203, ${wave.life * 0.2})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        return true;
      });

      // Draw and update particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gravity and friction
        particle.vy += 0.1;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update life
        particle.life--;
        
        if (particle.life <= 0) return false;

        // Draw particle with glow
        const alpha = particle.life / particle.maxLife;
        
        // Glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color.replace('0.6', `${alpha * 0.8}`));
        gradient.addColorStop(1, particle.color.replace('0.6', '0'));
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.fillStyle = particle.color.replace('0.6', `${alpha}`);
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.5;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.5;

        return true;
      });

      // Keep ambient particles alive
      if (particlesRef.current.length < 50) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          life: 1,
          maxLife: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
