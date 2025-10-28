import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'parallax';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration, delay }
          }
        };
      
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay, ease: "easeOut" }
          }
        };
      
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration, delay, ease: "easeOut" }
          }
        };
      
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration, delay, ease: "easeOut" }
          }
        };
      
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration, delay, ease: "easeOut" }
          }
        };
      
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            transition: { duration, delay, ease: "easeOut" }
          }
        };
      
      case 'parallax':
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay }
          }
        };
      
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration, delay }
          }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation container
export const StaggeredContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation component
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}> = ({ children, className = '', duration = 3, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation component
export const PulseElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}> = ({ children, className = '', duration = 2, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Gradient text animation
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-tech-blue via-tech-purple to-tech-cyan bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.span>
  );
};

// Typewriter effect
export const TypewriterText: React.FC<{
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}> = ({ text, className = '', speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText('');
      setCurrentIndex(0);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
}; 