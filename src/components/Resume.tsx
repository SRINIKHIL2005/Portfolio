import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Eye, ExternalLink, Calendar, User, Briefcase } from "lucide-react";

interface Resume {
  id: string;
  title: string;
  type: string;
  description: string;
  lastUpdated: string;
  pdf: string;
  tags: string[];
}

const Resume = () => {
  const [selectedResume, setSelectedResume] = useState<string>("ats-optimized");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);

  const resumes: Resume[] = [
    {
      id: "ats-optimized",
      title: "ATS-Optimized Resume",
      type: "ATS-Friendly",
      description: "Perfectly formatted for Applicant Tracking Systems with keyword optimization",
      lastUpdated: "2024-01-15",
      pdf: "/D_Sri_Nikhil_ATS100_Resume.pdf",
      tags: ["ATS-Optimized", "Keywords", "Clean Format"]
    },
    {
      id: "technical",
      title: "Technical Resume",
      type: "Technical",
      description: "Comprehensive technical skills and project showcase for engineering roles",
      lastUpdated: "2024-01-10",
      pdf: "/D_Sri_Nikhil_Technical_Resume.pdf",
      tags: ["Technical", "Projects", "Skills"]
    },
    {
      id: "internship",
      title: "Internship Resume",
      type: "Internship",
      description: "Tailored for internship applications with academic focus",
      lastUpdated: "2024-01-12",
      pdf: "/Sri NikhilDronadula_InternshalaResume.pdf",
      tags: ["Internship", "Academic", "Entry-Level"]
    }
  ];

  const getCurrentResume = () => {
    return resumes.find(resume => resume.id === selectedResume) || resumes[0];
  };

  const handleDownload = (resume: Resume) => {
    const link = document.createElement('a');
    link.href = resume.pdf;
    link.download = `${resume.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (resume: Resume) => {
    setPreviewResume(resume);
    setPreviewOpen(true);
  };

  const handleViewCV = () => {
    const defaultResume = getCurrentResume();
    window.open(defaultResume.pdf, '_blank');
  };

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
    <section id="resume" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Resume & CV
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multiple versions of my resume tailored for different purposes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <Card className="legendary-card border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Resume Selector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {resumes.map((resume) => (
                    <Button
                      key={resume.id}
                      variant={selectedResume === resume.id ? "default" : "outline"}
                      onClick={() => setSelectedResume(resume.id)}
                      className="text-sm"
                    >
                      {resume.title}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Last updated: {getCurrentResume().lastUpdated}</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {getCurrentResume().tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(getCurrentResume())}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handlePreview(getCurrentResume())}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <Card className="legendary-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Choose from multiple resume versions optimized for different purposes
              </p>
              
              <Button 
                onClick={handleViewCV}
                className="w-full flex items-center justify-center gap-2"
                size="lg"
              >
                <ExternalLink className="h-4 w-4" />
                View Current CV
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <Card 
                className={`legendary-card transition-all duration-300 hover:shadow-lg ${
                  selectedResume === resume.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                  <Badge variant="outline">{resume.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {resume.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {resume.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated: {resume.lastUpdated}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleDownload(resume)}
                  className="flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handlePreview(resume)}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
              </CardFooter>
            </Card>
            </div>
          ))}
        </div>

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                {previewResume?.title} Preview
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 min-h-0">
              {previewResume && (
                <iframe
                  src={previewResume.pdf}
                  className="w-full h-full border rounded"
                  title={`${previewResume.title} Preview`}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Resume; 