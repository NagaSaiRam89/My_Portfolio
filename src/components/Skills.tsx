import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C/C++"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Tailwind CSS", "Responsive UI", "Accessibility", "Framer Motion"],
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "OAuth 2.0", "BullMQ", "FFmpeg"],
  },
  {
    title: "Databases & Cloud",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Cloudinary", "Render", "Vercel", "Google Drive API"],
  },
  {
    title: "Engineering Practices",
    skills: ["TDD", "CI/CD", "Git", "GitHub", "OOP", "Async Processing", "System Design"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Skills
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Technical expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              A comprehensive toolkit for building modern web applications.
            </p>
          </div>

          {/* Skills grid */}
          <div className="space-y-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                className="card-elevated p-5 rounded-xl"
              >
                <h3 className="font-semibold text-sm text-primary mb-4 uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
