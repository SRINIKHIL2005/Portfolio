import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const titles = [
      "Full Stack Developer", 
      "AI & ML Specialist", 
      "Network Engineer", 
      "Cybersecurity Enthusiast"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout: NodeJS.Timeout;

    const type = () => {
      const currentTitle = titles[titleIndex];
      if (isDeleting) {
        if (typingRef.current) 
          typingRef.current.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        if (typingRef.current)
          typingRef.current.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
      typingTimeout = setTimeout(type, typingSpeed);
    };
    typingTimeout = setTimeout(type, 1000);

    // Parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(typingTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 grid-bg">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-tech-blue/10 animate-float"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-tech-purple/10 animate-float" 
          style={{ animationDelay: '2s', transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
        <div 
          className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-tech-cyan/10 animate-float" 
          style={{ animationDelay: '4s', transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
        
        {/* Code pattern background */}
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none overflow-hidden font-mono text-xs">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute whitespace-nowrap" style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0.7 - (i * 0.05),
              animation: `fadeIn ${1 + Math.random() * 3}s forwards`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`
            }}>
              {'{  }  import  *  from  =>  class  const  function  return  </>  &&  ||  ===  ++  --  ?:  //'}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-accent font-medium font-mono">
              Hello, I'm
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-display">
              D Sri <span className="gradient-text-cyber">Nikhil</span>
            </motion.h1>
            <div className="h-16">
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground">
                <span ref={typingRef} className="text-accent font-mono"></span>
                <span className="animate-pulse ml-1 text-accent">▋</span>
              </motion.p>
            </div>
          </div>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl">
            <span className="gradient-text-cyber font-semibold">Full Stack Developer</span> & <span className="gradient-text-ai font-semibold">AI Specialist</span> with experience building secure scalable web solutions and integrating AI.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex gap-4 justify-center">
            <Button asChild className="bg-gradient-cyber hover:opacity-90 transition-opacity">
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 backdrop-blur">
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-8 flex justify-center gap-6">
            <a href="https://github.com/SRINIKHIL2005" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/srinikhildronadula" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:Dronasrinikhil@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
            <a href="/D_Sri_Nikhil_ATS100_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" title="View CV">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <line x1="10" x2="8" y1="9" y2="9"></line>
              </svg>
            </a>
          </motion.div>

          {/* Tech badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {["MERN", "Python", "AI/ML", "Network Security", "React", "Node.js"].map((tech) => (
              <span key={tech} className="badge badge-accent text-xs">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="text-accent hover:text-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
