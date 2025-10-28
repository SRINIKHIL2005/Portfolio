import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award, Calendar, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  description: string;
  image?: string;
}

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  } as const;
  const certificates: Certificate[] = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      credentialId: "CLF-C02",
      skills: ["Cloud Computing", "AWS Services", "Security", "Pricing", "Support"],
    description: "Foundational understanding of AWS Cloud services, including compute, storage, networking, and security. Demonstrated knowledge of AWS architectural principles and cost optimization strategies.",
  image: `${import.meta.env.BASE_URL}certificates/aws-cloud-practitioner.jpg`
    },
    {
      title: "Salesforce Certified Agentforce Specialist",
      issuer: "Salesforce",
      date: "2025",
      credentialId: "N/A",
      skills: ["Salesforce", "Agentforce", "CRM", "Automation"],
      description: "Validated skills in Salesforce Agentforce for building AI-assisted CRM workflows and automations.",
  image: `${import.meta.env.BASE_URL}certificates/Salesforce.png`
    },
    {
      title: "Essentials Automation Certification",
      issuer: "Automation Anywhere",
      date: "2025",
      credentialId: "N/A",
      skills: ["RPA", "Automation Anywhere", "Bot Development", "Process Automation"],
      description: "Demonstrated knowledge of Robotic Process Automation fundamentals and building bots using Automation Anywhere tools.",
  image: `${import.meta.env.BASE_URL}certificates/Automation_Anywhere.png`
    },
    {
      title: "CipherCop National Event 2025 Finalist",
      issuer: "ISB & Telangana Cyber Security Bureau",
      date: "2025",
      credentialId: "Finalist 2025",
      skills: ["Cybersecurity", "Threat Analysis", "Incident Response"],
      description: "Recognized as a National Finalist for excellence in cybersecurity problem solving and defensive strategies.",
  image: `${import.meta.env.BASE_URL}certificates/CipherCop.png`
    }
  ];

  // De-duplicate by title to avoid accidental duplicate cards (e.g., two Salesforce entries)
  const visibleCerts: Certificate[] = Array.from(
    new Map(certificates.map((c) => [c.title, c])).values()
  );

  // Derive latest certification year from visible (deduped) data
  const latestYear = Math.max(
    ...visibleCerts.map(c => {
      const match = c.date.match(/\d{4}/);
      return match ? parseInt(match[0], 10) : 0;
    })
  );

  return (
    <motion.section
      id="certificates"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Award className="w-4 h-4 mr-2" />
              Professional Certifications
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-display text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Certifications & Achievements
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-gradient-cyber mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Industry-recognized certifications that validate expertise and commitment to continuous learning
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {visibleCerts.map((cert) => (
            <motion.div key={`${cert.title}-${cert.date}`} variants={itemVariants}>
              <Card 
                className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300"
              >
              {/* Certificate Image */}
              {cert.image && (
                <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <motion.img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-32 object-contain p-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Certificate Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {cert.title}
                </h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {cert.issuer}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{cert.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Skills Validated:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {cert.description}
              </p>

              {/* Verify button intentionally removed as requested */}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Stats */}
        <motion.div 
          className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[{
              value: String(visibleCerts.length),
              label: "Active Certifications"
            }, {
              value: "AWS",
              label: "Cloud Provider Focus"
            }, {
              value: String(latestYear || "—"),
              label: "Latest Certification"
            }].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.2 + idx * 0.08 }}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="mt-16 text-center">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Committed to Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These certifications represent my commitment to staying current with industry best practices and emerging technologies.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Certificates;
