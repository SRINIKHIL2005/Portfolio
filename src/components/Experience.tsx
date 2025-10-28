
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'work' | 'education';
  skills?: string[];
  image?: string;
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const timelineItems: TimelineItem[] = [
    {
      title: "Artificial Intelligence & Full-Stack Developer",
      organization: "UptoSkills",
      period: "Jan 2025 – April 2025",
      description: [
        "Architected real-time learning platform using MERN stack, reducing API response time by 40% through query optimization",
        "Implemented JWT authentication system securing 50k+ user accounts with role-based access control",
        "Integrated NLP modules using PyTorch for personalized learning recommendations (92% accuracy)"
      ],
      skills: ["MERN", "JWT", "NLP", "PyTorch", "React"],
      type: 'work',
      image: `${import.meta.env.BASE_URL}Internships/Uptoskills.png`
    },
    {
      title: "Network Engineering Intern",
      organization: "India Internet Foundation",
      period: "Feb 2025 – Aug 2025",
      description: [
        "Optimized DNS infrastructure handling 10k+ queries/second using Pub-Sub architecture",
        "Developed network monitoring dashboard with 98.5% uptime using React and Python analytics"
      ],
      skills: ["DNS", "React", "Python", "Network Security", "Pub-Sub"],
      type: 'work',
      image: `${import.meta.env.BASE_URL}Internships/IIFON.png`
    },
    {
      title: "Machine Learning Intern",
      organization: "Edunet Foundation (IBM)",
      period: "Jun 2025 – Jul 2025",
      description: [
        "Developed an employee salary prediction model for salary forecasting using machine learning",
        "Provided data insights for process optimization"
      ],
      skills: ["Machine Learning", "Python", "scikit-learn", "Pandas"],
      type: 'work',
      image: `${import.meta.env.BASE_URL}Internships/EDUNET.png`
    },
    {
      title: "B.Tech in Computer Science & Engineering",
      organization: "K L University, Hyderabad",
      period: "2021 - 2025",
      description: [
        "GPA: 8.97/10",
        "Specialization in Artificial Intelligence & Machine Learning"
      ],
      skills: ["AI/ML", "Computer Science", "Research"],
      type: 'education'
    }
  ];

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
    <motion.section 
      id="experience"
      className="py-20"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Experience & Education
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-gradient-ai mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-accent/20"></div>
          
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {timelineItems.map((item, index) => (
              <motion.div 
                key={index} 
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={itemVariants}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:px-8">
                  <Card className={`card-hover ${
                    item.type === 'work' 
                      ? 'border-l-tech-blue' 
                      : 'border-l-tech-purple'
                  } border-l-4 backdrop-blur-sm bg-card/75`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                        <Badge variant={item.type === 'work' ? 'default' : 'outline'} className={
                          item.type === 'work' ? 'bg-accent text-accent-foreground' : 'border-accent text-accent'
                        }>
                          {item.type === 'work' ? 'Work' : 'Education'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.organization}</div>
                      <div className="text-sm font-medium text-accent font-mono">{item.period}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {item.description.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">{point}</li>
                        ))}
                      </ul>
                      
                      {item.skills && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-secondary/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {item.image && (
                        <div className="mt-6 rounded-lg overflow-hidden bg-muted/50">
                          <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.organization} certificate`}>
                            <img 
                              src={item.image} 
                              alt={`${item.organization} Certificate`}
                              className="w-full h-40 object-contain p-4"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center z-10">
                  {item.type === 'work' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
