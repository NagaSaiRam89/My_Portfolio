import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

type Project = {
  title: string;
  subtitle: string;
  outcome: string;
  description: string;
  challenges: string[];
  tech: string[];
  github: string;
  demo?: string;
  badge?: string;
  caseStudy?: string;
};

const projects: Project[] = [
  {
    title: "Rivora",
    subtitle: "Collaborative recording platform",
    outcome:
      "40 percent faster responses, and zero recordings lost across 100+ sessions on unreliable connections.",
    description:
      "Built end to end in Java and Spring Boot with REST services, MongoDB storage and Redis caching, with Node.js workers handling the media pipeline and Kafka carrying work between them.",
    challenges: [
      "Spring Boot for the core API and domain logic, Node.js workers for media processing — each runtime where it is strongest",
      "Heavy media processing was holding up every request while it ran; moving it off the request path cut responses 40 percent",
      "Audio saves in small pieces that retry on their own and stitch back together when the connection returns — zero recordings lost across 100+ sessions",
      "Kafka between services, Redis for hot state, MongoDB for durable state, running on Kubernetes",
    ],
    tech: ["Java", "Spring Boot", "JUnit", "Kafka", "Kubernetes", "Node.js", "React", "MongoDB", "Redis", "BullMQ", "FFmpeg"],
    github: "https://github.com/NagaSaiRam89/rivora-spring",
    demo: "https://rivora-three.vercel.app/",
    badge: "Featured",
  },
  {
    title: "SnapStudy AI",
    subtitle: "Document processing app",
    outcome:
      "First place, solo, at Connect N Code Hackathon 2026 — sponsored by Google Gemini. Idea to deployed demo inside the competition window.",
    description:
      "Chains OCR into model calls to pull structured data out of handwritten notes and 50+ page PDFs, then turns the extracted topics into a study plan.",
    challenges: [
      "The model handles extraction; the scheduling logic stays a fixed algorithm rather than the model's judgement",
      "Tesseract and PDF.js normalise wildly different inputs before anything reaches Gemini",
      "Scoped, built, deployed and demoed end to end inside a fixed hackathon window",
    ],
    tech: ["React.js", "TypeScript", "Google Gemini API", "Tesseract OCR", "PDF.js"],
    github: "https://github.com/ramhere939/snapstudyai",
    badge: "Hackathon winner",
    caseStudy: "/case/snapstudy",
  },
  {
    title: "Trash-Clash",
    subtitle: "Full stack platform, live on Render and Vercel",
    outcome:
      "Shipped solo across the whole stack: 15+ REST endpoints over an 8-table database, plus the React interface, logins and permissions on top.",
    description:
      "Normalised PostgreSQL schema with JWT auth and role-based access control, deployed automatically on every push.",
    challenges: [
      "Normalised 8-table PostgreSQL schema designed up front",
      "Role-based access control over JWT",
      "GitHub Actions deploys on every push, with the test suite at 75%+ coverage catching regressions before production",
    ],
    tech: ["React.js", "Express.js", "Node.js", "PostgreSQL", "JWT", "GitHub Actions", "Jest"],
    github: "https://github.com/NagaSaiRam89/TrashClash",
    demo: "https://trash-clash.vercel.app/",
  },
  {
    title: "Projects in 21 Days",
    subtitle: "AI and ML portfolio",
    outcome:
      "21 AI projects built from raw data to a working result, certified by GeeksforGeeks.",
    description:
      "Agents that decide what to look up, call the right tool and act on the result, plus retrieval systems that ground answers in real source documents.",
    challenges: [
      "Tool-calling agents with the decision boundary kept explicit, not buried in a prompt",
      "RAG pipelines that cite the source document rather than paraphrasing it away",
      "Automation across n8n where a model was the wrong tool for the job",
    ],
    tech: ["Python", "LangChain", "TensorFlow", "PyTorch", "scikit-learn", "n8n"],
    github: "https://github.com/NagaSaiRam89/21_daysML",
  },
];


const alsoBuilt = [
  {
    title: "Cravier",
    note: "Sweet shop management system built test-first — TDD from the ground up, JWT auth, normalised inventory models.",
    github: "https://github.com/NagaSaiRam89/Cravier-Sweet-Shop-Management-System",
    demo: "https://cravier-sweet-shop-management-syste.vercel.app/",
  },
];

export function Projects() {
  const { ref, reveal } = useReveal();

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)}>
          {/* Section header */}
          <div className="max-w-4xl mx-auto mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Things I built and shipped
            </h2>
            <p className="text-muted-foreground text-lg">
              Each one led by what it does, then how it was put together.
            </p>
          </div>

          {/* Projects grid */}
          <div className="max-w-5xl mx-auto grid gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                {...reveal(0.1 * index, 30)}
                className="group card-elevated rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        {project.badge && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {project.badge === "Hackathon winner" && (
                              <Trophy className="h-3 w-3" />
                            )}
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.caseStudy && (
                        <Link to={project.caseStudy}>
                          <Button variant="default" size="sm" className="gap-2">
                            <BookOpen className="h-4 w-4" />
                            Case Study
                          </Button>
                        </Link>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Button variant="default" size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Outcome first */}
                  <p className="font-medium mb-2 leading-relaxed">
                    {project.outcome}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Engineering decisions */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Key Engineering Decisions
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-start gap-2 text-sm">
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

          {/* Also built */}
          <motion.div {...reveal(0.5)} className="max-w-5xl mx-auto mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Also built
            </h3>
            <div className="grid gap-3">
              {alsoBuilt.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 rounded-xl card-glass"
                >
                  <span className="font-medium text-sm shrink-0">{item.title}</span>
                  <span className="text-sm text-muted-foreground flex-1">
                    {item.note}
                  </span>
                  <div className="flex items-center gap-3 shrink-0 text-sm">
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Demo
                    </a>
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
