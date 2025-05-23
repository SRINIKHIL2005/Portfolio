
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  percentage: number;
  category: string;
}

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: false, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const skills: { [key: string]: Skill[] } = {
    "Languages & Frameworks": [
      { name: "React", percentage: 90, category: "frontend" },
      { name: "Node.js", percentage: 85, category: "backend" },
      { name: "Python", percentage: 80, category: "languages" },
      { name: "JavaScript", percentage: 90, category: "languages" },
      { name: "Java", percentage: 75, category: "languages" },
      { name: "Flask", percentage: 70, category: "backend" },
    ],
    "Databases & DevOps": [
      { name: "MongoDB", percentage: 85, category: "database" },
      { name: "MySQL", percentage: 80, category: "database" },
      { name: "Firebase", percentage: 75, category: "database" },
      { name: "Docker", percentage: 70, category: "devops" },
      { name: "CI/CD", percentage: 65, category: "devops" },
      { name: "AWS", percentage: 70, category: "devops" },
    ],
    "AI/ML & Security": [
      { name: "NLP", percentage: 75, category: "ai" },
      { name: "LLMs", percentage: 80, category: "ai" },
      { name: "Network Security", percentage: 70, category: "security" },
      { name: "JWT Auth", percentage: 85, category: "security" },
      { name: "API Development", percentage: 90, category: "backend" },
    ]
  };

  // All unique categories
  const categories = Array.from(
    new Set(
      Object.values(skills)
        .flat()
        .map(skill => skill.category)
    )
  );
  
  // Filter skills by category
  const filterSkills = () => {
    if (activeCategory === "all") {
      return skills;
    }
    
    const filteredSkills: { [key: string]: Skill[] } = {};
    
    Object.entries(skills).forEach(([category, skillList]) => {
      const filtered = skillList.filter(skill => skill.category === activeCategory);
      if (filtered.length > 0) {
        filteredSkills[category] = filtered;
      }
    });
    
    return filteredSkills;
  };
  
  return (
    <section id="skills" className="py-20 bg-secondary/50">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-gradient-cyber mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p
            className="mt-4 max-w-xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Proficient in various technologies with a focus on full-stack development, AI integration, and secure system design.
          </motion.p>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mx-auto mb-8 flex flex-wrap justify-center">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveCategory("all")}
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  All Skills
                </TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
        
        <div ref={skillsRef} className="space-y-12">
          {Object.entries(filterSkills()).map(([category, skillsList], index) => (
            <motion.div 
              key={category}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            >
              <h3 className="text-xl font-semibold mb-6 inline-flex items-center gap-2">
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 py-1">
                  {category}
                </Badge>
              </h3>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                {skillsList.map((skill, idx) => (
                  <motion.div 
                    key={idx} 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * (idx + 1) }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">{skill.name}</span>
                      <span className="text-muted-foreground font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress" 
                        style={{ 
                          backgroundImage: skill.category === 'security' 
                            ? 'linear-gradient(90deg, #10b981, #2563eb)' 
                            : skill.category === 'ai'
                            ? 'linear-gradient(90deg, #7c3aed, #ef4444)' 
                            : 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.2 * idx }}
                      >
                        {isInView && <div className="shimmer animate-shimmer"></div>}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill hexagon grid visualization */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-8">Featured Skills</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              { name: "React", color: "bg-tech-blue" },
              { name: "Node.js", color: "bg-tech-green" },
              { name: "MongoDB", color: "bg-tech-cyan" },
              { name: "AI/ML", color: "bg-tech-purple" },
              { name: "Python", color: "bg-tech-indigo" },
              { name: "Network Security", color: "bg-tech-red" },
              { name: "API Development", color: "bg-tech-orange" },
              { name: "JWT Auth", color: "bg-tech-blue" }
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                className={`hexagon ${skill.color} w-24 h-24 flex items-center justify-center text-white text-xs font-medium shadow-lg`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
