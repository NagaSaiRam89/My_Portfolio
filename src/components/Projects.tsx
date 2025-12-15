import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Cravier",
    subtitle: "Sweet Shop Management System",
    description:
      "Full-stack inventory and order management system built with Test-Driven Development (TDD). Features secure JWT authentication, clean architecture patterns, and scalable data models.",
    challenges: [
      "Implemented TDD from ground up for reliability",
      "Designed normalized data models for inventory tracking",
      "Built secure authentication with role-based access",
    ],
    tech: ["React", "Node.js", "MongoDB", "TypeScript", "JWT"],
    github: "https://github.com/NagaSaiRam89/Cravier-Sweet-Shop-Management-System",
    demo: "https://cravier-sweet-shop-management-syste.vercel.app/",
    featured: true,
  },
  {
    title: "Rivora",
    subtitle: "Fault-Tolerant Remote Recording",
    description:
      "Real-time recording platform with local MediaStream capture in 5-second chunks. Implements async cloud merging using BullMQ and FFmpeg, preventing data loss during network failures.",
    challenges: [
      "Designed fault-tolerant chunk-based recording system",
      "Async processing with BullMQ job queues",
      "Improved API responsiveness by 40%",
    ],
    tech: ["React", "Node.js", "MongoDB", "Redis", "BullMQ", "FFmpeg", "Cloudinary"],
    github: "https://github.com/NagaSaiRam89/Rivora",
    demo: "https://rivora-three.vercel.app/",
    featured: true,
  },
  {
    title: "Map My Notes",
    subtitle: "Intelligent Visual Note-Taking",
    description:
      "Transforms handwritten notes into interactive concept maps using OCR technology. Integrates with Google Drive for seamless storage and synchronization.",
    challenges: [
      "OCR implementation with Tesseract.js",
      "Google OAuth + Drive API integration",
      "Focus on learning productivity & UX",
    ],
    tech: ["React", "Tailwind", "Google APIs", "Tesseract.js"],
    github: "https://github.com/NagaSaiRam89/Map-My-Notes",
    demo: "https://map-my-notes.vercel.app/notes",
    featured: true,
  },
  {
    title: "Trash-Clash",
    subtitle: "Strategy Gaming Platform",
    description:
      "Real-time strategy platform with normalized PostgreSQL schema, JWT authentication with role-based access control, and automated CI/CD deployment pipeline.",
    challenges: [
      "Normalized PostgreSQL schema design",
      "RBAC implementation",
      "CI/CD on Vercel & Render",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    github: "https://github.com/NagaSaiRam89/TrashClash",
    demo: "https://trash-clash.vercel.app/",
    featured: false,
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="max-w-4xl mx-auto mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Featured work
            </h2>
            <p className="text-muted-foreground text-lg">
              Production-grade applications showcasing engineering decisions and technical depth.
            </p>
          </div>

          {/* Projects grid */}
          <div className="max-w-5xl mx-auto grid gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group card-elevated rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        {project.featured && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="default" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Button>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-2">
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Engineering challenges */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Key Engineering Decisions
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
