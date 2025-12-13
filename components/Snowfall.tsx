import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Snowflakes array
    const snowflakes: { 
      x: number; 
      y: number; 
      radius: number; 
      speed: number; 
      wind: number; 
      sway: number; 
      swaySpeed: number;
      opacity: number; 
    }[] = [];
    
    const count = 200; // Increased count for better density

    // Helper to create a snowflake
    const createSnowflake = (initialY?: number) => {
      const radius = Math.random() * 3 + 1;
      // Larger flakes fall slightly faster to simulate depth
      const speed = (radius / 3) * 1.5 + Math.random() * 0.5; 
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -10,
        radius: radius,
        speed: speed,
        wind: (Math.random() - 0.5) * 0.5, // Subtle random horizontal drift
        sway: Math.random() * Math.PI * 2, // Random starting sway phase
        swaySpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.5 + 0.4,
      };
    };

    // Initialize snowflakes spread across the screen
    for (let i = 0; i < count; i++) {
      snowflakes.push(createSnowflake(Math.random() * height));
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const flake = snowflakes[i];
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
        ctx.fill();

        // Update Position
        flake.y += flake.speed;
        // Sway movement (sine wave)
        flake.sway += flake.swaySpeed;
        flake.x += Math.sin(flake.sway) * 0.5 + flake.wind;

        // Reset if off bottom of screen
        if (flake.y > height) {
          Object.assign(flake, createSnowflake());
        }
        
        // Wrap horizontally if drifting too far, but keep Y
        if (flake.x > width + 20) {
          flake.x = -20;
        } else if (flake.x < -20) {
          flake.x = width + 20;
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default Snowfall;