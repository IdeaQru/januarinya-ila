import React, { useEffect, useState } from 'react';

export function WaterCursor() {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      };

      setTrails(prev => [...prev.slice(-15), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup old trails
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-10));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute rounded-full animate-water-drop"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${20 - index}px`,
            height: `${20 - index}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(255, 160, 180, ${0.6 - index * 0.04}) 0%, rgba(255, 192, 203, ${0.3 - index * 0.02}) 50%, transparent 100%)`,
            opacity: 1 - index * 0.06,
            animation: `water-drop ${0.8 + index * 0.05}s ease-out forwards`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes water-drop {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        
        .animate-water-drop {
          filter: blur(2px);
        }
      `}</style>
    </div>
  );
}
