import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

// Global color themes with background and text colors
const colorThemes = [
  {
    background: '#0f172a', // Dark slate
    text: '#ffffff', // Pure white text
    accent: '#3b82f6', // Blue
    name: 'dark-blue'
  },
  {
    background: '#1e1b4b', // Dark indigo
    text: '#f8fafc', // Very light text
    accent: '#8b5cf6', // Purple
    name: 'dark-purple'
  },
  {
    background: '#064e3b', // Dark emerald
    text: '#f0fdf4', // Very light green text
    accent: '#10b981', // Green
    name: 'dark-green'
  },
  {
    background: '#7f1d1d', // Dark red
    text: '#fef2f2', // Very light red text
    accent: '#ef4444', // Red
    name: 'dark-red'
  },
  {
    background: '#92400e', // Dark orange
    text: '#fffbeb', // Very light orange text
    accent: '#f59e0b', // Orange
    name: 'dark-orange'
  },
  {
    background: '#831843', // Dark pink
    text: '#fdf2f8', // Very light pink text
    accent: '#ec4899', // Pink
    name: 'dark-pink'
  },
  {
    background: '#14532d', // Dark green
    text: '#f0fdf4', // Very light green text
    accent: '#22c55e', // Emerald
    name: 'dark-emerald'
  },
  {
    background: '#581c87', // Dark violet
    text: '#faf5ff', // Very light violet text
    accent: '#a855f7', // Violet
    name: 'dark-violet'
  },
  {
    background: '#78350f', // Dark amber
    text: '#fffbeb', // Very light amber text
    accent: '#f59e0b', // Amber
    name: 'dark-amber'
  },
  {
    background: '#0e7490', // Dark cyan
    text: '#ecfeff', // Very light cyan text
    accent: '#06b6d4', // Cyan
    name: 'dark-cyan'
  }
];

const LiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>();
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]);

  // Helper function to create rgba color from hex
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Memoize particle colors to prevent recalculation
  const particleColors = useMemo(() => {
    return [
      hexToRgba(currentTheme.accent, 0.3), // 30% opacity - more transparent
      hexToRgba(currentTheme.accent, 0.2), // 20% opacity
      hexToRgba(currentTheme.accent, 0.1), // 10% opacity
    ];
  }, [currentTheme.accent]);

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

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(window.innerWidth / 15, 100); // Fewer particles
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Slower movement
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1, // Smaller particles
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.4 + 0.1, // Lower opacity
        });
      }
    };

    // Initialize bubbles
    const initBubbles = () => {
      bubblesRef.current = [];
      const bubbleCount = 8; // Fixed number of bubbles
      
      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 60 + 40, // Larger bubbles
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: hexToRgba(currentTheme.accent, 0.05), // Very transparent
          opacity: Math.random() * 0.1 + 0.05, // Very low opacity
        });
      }
    };

    // Animate particles and bubbles
    const animate = () => {
      // Clear with theme background
      ctx.fillStyle = hexToRgba(currentTheme.background, 0.1); // Very transparent background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bubbles first (background layer)
      bubblesRef.current.forEach((bubble, index) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off edges
        if (bubble.x - bubble.radius <= 0 || bubble.x + bubble.radius >= canvas.width) bubble.vx *= -1;
        if (bubble.y - bubble.radius <= 0 || bubble.y + bubble.radius >= canvas.height) bubble.vy *= -1;

        // Draw bubble with gradient
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, 0,
          bubble.x, bubble.y, bubble.radius
        );
        gradient.addColorStop(0, bubble.color);
        gradient.addColorStop(0.7, hexToRgba(currentTheme.accent, 0.02));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = bubble.opacity;
        ctx.fill();
      });

      // Update and draw particles (foreground layer)
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle with subtle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw subtle connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = hexToRgba(currentTheme.accent, 0.1); // Very transparent
              ctx.lineWidth = 0.5; // Thinner lines
              ctx.globalAlpha = 0.3;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    initBubbles();
    animate();

    // Color change timer - every 5 seconds
    const colorInterval = setInterval(() => {
      const nextIndex = (currentColorIndex + 1) % colorThemes.length;
      const nextTheme = colorThemes[nextIndex];
      
      setCurrentColorIndex(nextIndex);
      setCurrentTheme(nextTheme);
      
      // Update document root styles for global theming
      document.documentElement.style.setProperty('--current-bg', nextTheme.background);
      document.documentElement.style.setProperty('--current-text', nextTheme.text);
      document.documentElement.style.setProperty('--current-accent', nextTheme.accent);
      
      // Update body background smoothly
      document.body.style.backgroundColor = nextTheme.background;
      document.body.style.color = nextTheme.text;
    }, 5000);

    // Initialize first theme
    document.documentElement.style.setProperty('--current-bg', currentTheme.background);
    document.documentElement.style.setProperty('--current-text', currentTheme.text);
    document.documentElement.style.setProperty('--current-accent', currentTheme.accent);
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.text;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(colorInterval);
    };
  }, [currentColorIndex, currentTheme, particleColors]);

  // Update particle colors when theme changes
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach(particle => {
        particle.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      });
    }
    if (bubblesRef.current.length > 0) {
      bubblesRef.current.forEach(bubble => {
        bubble.color = hexToRgba(currentTheme.accent, 0.05);
      });
    }
  }, [particleColors, currentTheme.accent]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default LiveBackground; 