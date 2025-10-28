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
              I'm a <span className="font-semibold gradient-text-cyber">Computer Science student</span> interested in <span className="font-mono text-accent">Web Development</span>, <span className="font-mono text-accent">AI</span>, <span className="font-mono text-accent">automation</span>, and <span className="font-mono text-accent">data analytics</span>.
            </p>
            <p>
              I build scalable projects and systems that enhance operational efficiency and decision‑making. My foundation spans <span className="font-mono text-accent">Python</span>, <span className="font-mono text-accent">C</span>, <span className="font-mono text-accent">Java</span>, cloud technologies, <span className="font-mono text-accent">AI & ML</span>, and full‑stack development.
            </p>
            <p>
              Recently, I've focused on practical AI integrations (APIs and frameworks), secure API design, and data‑driven features that deliver measurable impact.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Experience",
                value: "1",
                unit: "Year",
                desc: "Projects & Internships",
                color: "from-tech-blue to-tech-purple"
              },
              {
                title: "Projects",
                value: "5+",
                unit: "Developed",
                desc: "Hackathons & Internship Projects",
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

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Feel free to reach out to me via email for any inquiries or collaborations.</p>
          <a href="mailto:dronasrinikhil@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
