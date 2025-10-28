import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Database, Cloud, Shield, Cpu, Globe } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  category: string;
  icon?: string;
}

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  
  const skills: { [key: string]: Skill[] } = {
    "Programming Languages": [
      { name: "Python", percentage: 95, category: "languages" },
      { name: "JavaScript", percentage: 90, category: "languages" },
      { name: "Java", percentage: 85, category: "languages" },
      { name: "C/C++", percentage: 80, category: "languages" },
      { name: "TypeScript", percentage: 85, category: "languages" },
      { name: "HTML/CSS", percentage: 95, category: "frontend" },
    ],
    "Frameworks & Libraries": [
      { name: "React.js", percentage: 90, category: "frontend" },
      { name: "Node.js", percentage: 85, category: "backend" },
      { name: "Express.js", percentage: 90, category: "backend" },
      { name: "Flask", percentage: 80, category: "backend" },
      { name: "MongoDB", percentage: 85, category: "database" },
      { name: "MySQL", percentage: 80, category: "database" },
    ],
    "AI/ML & Cloud": [
      { name: "Machine Learning", percentage: 85, category: "ai" },
      { name: "Natural Language Processing", percentage: 80, category: "ai" },
      { name: "Large Language Models", percentage: 85, category: "ai" },
      { name: "AWS Cloud", percentage: 75, category: "cloud" },
      { name: "Docker", percentage: 80, category: "devops" },
      { name: "Git/GitHub", percentage: 95, category: "devops" },
    ],
    "Security & Networking": [
      { name: "Network Security", percentage: 85, category: "security" },
      { name: "JWT Authentication", percentage: 90, category: "security" },
      { name: "API Security", percentage: 85, category: "security" },
      { name: "Firewall Configuration", percentage: 80, category: "security" },
      { name: "VPN & Encryption", percentage: 85, category: "security" },
    ]
  };

  // All unique categories with icons
  const categoryConfig = {
    all: { name: "All Skills", icon: Globe, color: "text-gray-600" },
    languages: { name: "Languages", icon: Code2, color: "text-blue-600" },
    frontend: { name: "Frontend", icon: Globe, color: "text-purple-600" },
    backend: { name: "Backend", icon: Database, color: "text-green-600" },
    database: { name: "Database", icon: Database, color: "text-orange-600" },
    ai: { name: "AI/ML", icon: Cpu, color: "text-pink-600" },
    cloud: { name: "Cloud", icon: Cloud, color: "text-cyan-600" },
    devops: { name: "DevOps", icon: Code2, color: "text-lime-600" },
    security: { name: "Security", icon: Shield, color: "text-red-600" }
  };

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

  // Get skill level description
  const getSkillLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Expert", color: "text-green-600 bg-green-100" };
    if (percentage >= 80) return { level: "Advanced", color: "text-blue-600 bg-blue-100" };
    if (percentage >= 70) return { level: "Intermediate", color: "text-yellow-600 bg-yellow-100" };
    return { level: "Beginner", color: "text-gray-600 bg-gray-100" };
  };

  // Animate progress bars when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName) {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, skillName]));
              }, Math.random() * 500);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillElements = document.querySelectorAll('[data-skill]');
    skillElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section id="skills" className="py-20 scroll-mt-24" ref={skillsRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['all', ...categories].map((category) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config?.icon || Globe;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {config?.name || category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {Object.entries(filterSkills()).map(([category, skillList]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                {category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillList.map((skill) => {
                  const skillLevel = getSkillLevel(skill.percentage);
                  const isAnimated = animatedSkills.has(skill.name);
                  
                  return (
                    <Card 
                      key={skill.name} 
                      className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
                      data-skill={skill.name}
                    >
                      <div className="space-y-4">
                        {/* Skill Header */}
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg text-gray-800">
                            {skill.name}
                          </h4>
                          <Badge className={`text-xs px-2 py-1 ${skillLevel.color}`}>
                            {skillLevel.level}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Proficiency</span>
                            <span className="font-medium text-blue-600">
                              {isAnimated ? skill.percentage : 0}%
                            </span>
                          </div>
                          <div className="relative">
                            <Progress 
                              value={isAnimated ? skill.percentage : 0} 
                              className="h-3 bg-gray-200"
                            />
                            <div 
                              className="absolute inset-0 h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                background: `linear-gradient(90deg, ${
                                  skill.percentage >= 90 ? '#10b981' :
                                  skill.percentage >= 80 ? '#3b82f6' :
                                  skill.percentage >= 70 ? '#f59e0b' : '#6b7280'
                                }, ${
                                  skill.percentage >= 90 ? '#059669' :
                                  skill.percentage >= 80 ? '#1d4ed8' :
                                  skill.percentage >= 70 ? '#d97706' : '#4b5563'
                                })`,
                                width: isAnimated ? `${skill.percentage}%` : '0%',
                                borderRadius: '9999px'
                              }}
                            />
                          </div>
                        </div>

                        {/* Skill Category Badge */}
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            {categoryConfig[skill.category as keyof typeof categoryConfig]?.name || skill.category}
                          </Badge>
                          <div className={`w-3 h-3 rounded-full ${
                            skill.percentage >= 90 ? 'bg-green-500' :
                            skill.percentage >= 80 ? 'bg-blue-500' :
                            skill.percentage >= 70 ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Skills Overview</h3>
            <p className="text-gray-600">Total skills across different categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {Object.entries(categoryConfig).slice(1).map(([key, config]) => {
              const skillCount = Object.values(skills).flat().filter(skill => skill.category === key).length;
              const IconComponent = config.icon;
              
              return (
                <div key={key} className="space-y-2">
                  <div className={`mx-auto w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center ${config.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{skillCount}</div>
                  <div className="text-sm text-gray-600">{config.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
