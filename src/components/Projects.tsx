import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, Minus } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: string;  // Optional project image
  links?: {
    demo?: string;
    github?: string;
  };
}

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const projects: Project[] = [
    {
      title: "AI-Powered Quiz Generator",
      description: "Automated system that creates contextually relevant quizzes from PDF documents.",
      technologies: ["PyMuPDF", "Gemini API", "React", "MongoDB", "Node.js"],
      highlights: [
        "Automated quiz creation from PDFs using PyMuPDF and Gemini API (90% contextual accuracy)",
        "Reduced API latency by 35% through MongoDB indexing and query optimization",
        "Increased user engagement by 40% via React animations and progress tracking"
      ],
      links: {
        demo: "https://srinikhil2005.github.io/AI-Powered-Quiz-Generator/",
        github: "https://github.com/SRINIKHIL2005/AI-Powered-Quiz-Generator"
      }
    },
    {
      title: "Enhanced Student Feedback System",
      description: "Streamlined system for processing and analyzing student feedback.",
      technologies: ["Node.js", "Express", "MongoDB Atlas", "React", "Chart.js"],
      highlights: [
        "Streamlined feedback processing by 30% using Node.js middleware architecture",
        "Achieved 99.9% uptime through MongoDB Atlas cluster optimization",
        "Implemented real-time analytics dashboard for instructors"
      ],
      links: {
        demo: "https://e-f-g-1.onrender.com/",
        github: "https://github.com/SRINIKHIL2005/EDUGALXY"
      }
    },
    {
      title: "Solo Learn (Learning Platform)",
      description: "Interactive learning platform with AI-driven recommendations and analytics.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "AI/ML"],
      highlights: [
        "Led development of an interactive learning platform utilizing the MERN stack",
        "Built AI-driven UI/UX platform with MongoDB, analytics, secure APIs",
        "Implemented personalized learning paths with recommendation algorithms"
      ],
      links: {
        demo: "https://srinikhil2005.github.io/Solo-Learn-Learning-Platform-/",
        github: "https://github.com/SRINIKHIL2005/Solo-Learn-Learning-Platform-"
      }
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Technical badges with colors mapped
  const techColorMap: Record<string, string> = {
    "React": "bg-tech-blue/20 text-tech-blue border-tech-blue/30",
    "MongoDB": "bg-tech-green/20 text-tech-green border-tech-green/30",
    "Node.js": "bg-tech-green/20 text-tech-green border-tech-green/30",
    "Express": "bg-tech-purple/20 text-tech-purple border-tech-purple/30",
    "AI/ML": "bg-tech-red/20 text-tech-red border-tech-red/30",
    "Chart.js": "bg-tech-orange/20 text-tech-orange border-tech-orange/30",
    "MongoDB Atlas": "bg-tech-green/20 text-tech-green border-tech-green/30",
    "Gemini API": "bg-tech-purple/20 text-tech-purple border-tech-purple/30",
    "PyMuPDF": "bg-tech-blue/20 text-tech-blue border-tech-blue/30"
  };

  const getTechBadgeClass = (tech: string) => {
    return techColorMap[tech] || "bg-accent/20 text-accent border-accent/30";
  };
  
  return (
    <motion.section 
      id="projects" 
      className="py-20 bg-secondary/30"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Key Projects
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-gradient-cyber mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.p 
            className="mt-4 max-w-lg mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore my recent projects showcasing my technical skills and problem-solving approach
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Project navigation */}
          <motion.div 
            className="md:w-1/3"
            variants={itemVariants}
          >
            <div className="space-y-2 md:sticky md:top-24">
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-md transition-all flex items-center gap-3 ${
                    activeIndex === index 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-secondary"
                  }`}
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeIndex === index ? "bg-background text-accent" : "bg-accent/20 text-accent"
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {project.technologies.slice(0, 2).join(", ")}
                      {project.technologies.length > 2 ? "..." : ""}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Project details */}
          <motion.div 
            className="md:w-2/3"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-accent/20 backdrop-blur-sm bg-card/75">
                  <div className="h-2 w-full bg-gradient-to-r from-tech-blue via-tech-purple to-tech-cyan"></div>
                  <CardHeader className="bg-secondary/30">
                    <div className="flex justify-between items-start">
                      <CardTitle>{projects[activeIndex].title}</CardTitle>
                      <div className="flex gap-2">
                        {projects[activeIndex].links?.github && (
                          <a 
                            href={projects[activeIndex].links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {projects[activeIndex].links?.demo && (
                          <a 
                            href={projects[activeIndex].links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{projects[activeIndex].description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Minus className="text-accent" size={18} /> Key Highlights
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {projects[activeIndex].highlights.map((highlight, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                        >
                          <span className="text-accent">•</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Code className="text-accent" size={18} /> Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeIndex].technologies.map((tech, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className={`${getTechBadgeClass(tech)}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-secondary/20 flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} 
                      disabled={activeIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveIndex(Math.min(projects.length - 1, activeIndex + 1))} 
                      disabled={activeIndex === projects.length - 1}
                    >
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
