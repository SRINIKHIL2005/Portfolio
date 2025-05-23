
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <motion.section 
      id="about" 
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-tech-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-tech-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">About Me</h2>
          <div className="h-1 w-20 bg-gradient-cyber mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg">
              I'm a <span className="font-semibold gradient-text-cyber">Certified Full Stack Developer & AI Specialist</span> with over 2 years of experience building secure, scalable web solutions. 
            </p>
            <p>
              My expertise spans the <span className="font-mono text-accent">MERN</span> stack development, <span className="font-mono text-accent">REST API</span> security (JWT/OAuth), and large language model integration. As an <span className="font-mono text-accent">NVIDIA-certified</span> AI developer, I've successfully optimized MongoDB performance for over 1 million records and implemented real-time analytics systems.
            </p>
            <p>
              I'm passionate about combining web development with artificial intelligence to create innovative solutions that solve real-world problems.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <span className="mr-2">Contact Me</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <span className="mr-2">Download CV</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Experience",
                value: "2+",
                unit: "Years",
                desc: "Full Stack Development",
                color: "from-tech-blue to-tech-purple"
              },
              {
                title: "Projects",
                value: "10+",
                unit: "Projects",
                desc: "Completed Successfully",
                color: "from-tech-purple to-tech-cyan"
              },
              {
                title: "Certifications",
                value: "3+",
                unit: "Certs",
                desc: "Industry Standard",
                color: "from-tech-cyan to-tech-green"
              },
              {
                title: "Education",
                value: "B.Tech",
                unit: "CS",
                desc: "K L University, GPA: 8.97",
                color: "from-tech-green to-tech-blue"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Card className="card-hover overflow-hidden border-0 shadow-md">
                  <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`}></div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-muted-foreground text-sm font-mono">{stat.title}</h3>
                    <div className="text-3xl font-bold my-2 font-display">
                      {stat.value} <span className="text-accent text-xl">{stat.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
