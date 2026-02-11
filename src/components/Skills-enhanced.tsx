import { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Database, Cloud, Shield, Cpu, Globe, Zap, Layers, Star, TrendingUp } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
  color: string;
  years: string;
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasAnimated, setHasAnimated] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: <Layers className="w-4 h-4" /> },
    { id: 'frontend', name: 'Frontend', icon: <Globe className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend', icon: <Database className="w-4 h-4" /> },
    { id: 'devops', name: 'DevOps', icon: <Cloud className="w-4 h-4" /> },
    { id: 'languages', name: 'Languages', icon: <Code2 className="w-4 h-4" /> },
    { id: 'tools', name: 'Tools', icon: <Cpu className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
  ];

  const skills: Skill[] = [
    {
      category: 'frontend',
      name: 'React',
      level: 90,
      description: 'Modern React with hooks, context, and advanced patterns',
      color: 'from-blue-500 to-cyan-500',
      years: '3+ years'
    },
    {
      category: 'frontend',
      name: 'TypeScript',
      level: 85,
      description: 'Type-safe JavaScript development',
      color: 'from-blue-600 to-blue-400',
      years: '2+ years'
    },
    {
      category: 'frontend',
      name: 'Next.js',
      level: 80,
      description: 'Full-stack React framework with SSR/SSG',
      color: 'from-gray-800 to-gray-600',
      years: '2+ years'
    },
    {
      category: 'frontend',
      name: 'Tailwind CSS',
      level: 90,
      description: 'Utility-first CSS framework',
      color: 'from-teal-500 to-cyan-500',
      years: '2+ years'
    },
    {
      category: 'backend',
      name: 'Node.js',
      level: 85,
      description: 'Server-side JavaScript runtime',
      color: 'from-green-600 to-green-400',
      years: '3+ years'
    },
    {
      category: 'backend',
      name: 'Express.js',
      level: 80,
      description: 'Fast and minimalist web framework',
      color: 'from-gray-700 to-gray-500',
      years: '2+ years'
    },
    {
      category: 'backend',
      name: 'MongoDB',
      level: 75,
      description: 'NoSQL database with flexible schema',
      color: 'from-green-700 to-green-500',
      years: '2+ years'
    },
    {
      category: 'backend',
      name: 'PostgreSQL',
      level: 70,
      description: 'Advanced relational database',
      color: 'from-blue-800 to-blue-600',
      years: '1+ years'
    },
    {
      category: 'devops',
      name: 'AWS',
      level: 80,
      description: 'Cloud computing services and architecture',
      color: 'from-orange-500 to-yellow-500',
      years: '2+ years'
    },
    {
      category: 'devops',
      name: 'Docker',
      level: 75,
      description: 'Containerization and deployment',
      color: 'from-blue-500 to-blue-700',
      years: '1+ years'
    },
    {
      category: 'devops',
      name: 'GitHub Actions',
      level: 70,
      description: 'CI/CD automation and workflows',
      color: 'from-gray-800 to-gray-600',
      years: '1+ years'
    },
    {
      category: 'languages',
      name: 'JavaScript',
      level: 90,
      description: 'ES6+ modern JavaScript development',
      color: 'from-yellow-500 to-yellow-400',
      years: '4+ years'
    },
    {
      category: 'languages',
      name: 'Python',
      level: 85,
      description: 'Backend development and data analysis',
      color: 'from-blue-600 to-green-500',
      years: '3+ years'
    },
    {
      category: 'languages',
      name: 'Java',
      level: 75,
      description: 'Object-oriented programming and Spring',
      color: 'from-red-600 to-orange-500',
      years: '2+ years'
    },
    {
      category: 'tools',
      name: 'Git',
      level: 85,
      description: 'Version control and collaboration',
      color: 'from-orange-600 to-red-500',
      years: '3+ years'
    },
    {
      category: 'tools',
      name: 'VS Code',
      level: 90,
      description: 'Professional development environment',
      color: 'from-blue-600 to-blue-400',
      years: '4+ years'
    },
    {
      category: 'tools',
      name: 'Figma',
      level: 70,
      description: 'UI/UX design and prototyping',
      color: 'from-purple-600 to-pink-500',
      years: '1+ years'
    },
    {
      category: 'security',
      name: 'JWT',
      level: 80,
      description: 'JSON Web Token authentication',
      color: 'from-green-600 to-teal-500',
      years: '2+ years'
    },
    {
      category: 'security',
      name: 'OAuth',
      level: 75,
      description: 'Secure authorization framework',
      color: 'from-purple-600 to-indigo-500',
      years: '1+ years'
    }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.setProperty('--sparkle-x', `${x}px`);
    card.style.setProperty('--sparkle-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Technical Expertise
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks, constantly evolving with industry trends
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 scale-105'
                  : 'bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 shadow-md hover:shadow-lg dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <Card 
                className={`legendary-card group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 ${
                  hasAnimated ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: hasAnimated ? `${index * 100}ms` : '0ms',
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h3>
                    <Badge variant="outline" className="text-xs mt-1 opacity-75">
                      {skill.years}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {skill.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Proficiency
                    </span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        {skill.level >= 80 ? 'Expert' : skill.level >= 60 ? 'Advanced' : 'Intermediate'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={hasAnimated ? skill.level : 0} 
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: hasAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {skills.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Technologies
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                4+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {skillCategories.length - 1}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Skill Categories
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                85%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Proficiency
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
