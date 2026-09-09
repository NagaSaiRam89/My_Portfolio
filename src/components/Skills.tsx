import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";

const skillCategories = [
  {
    title: "Backend",
    lead: true,
    skills: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "NestJS",
      "REST API design",
      "Microservices",
      "Event-driven architecture",
      "Kafka",
      "Message queues (BullMQ)",
      "Third-party API integration",
      "Idempotency & retry semantics",
    ],
  },
  {
    title: "Languages",
    skills: ["Java", "Python", "JavaScript (ES6+)", "TypeScript", "C++", "SQL"],
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "SQL",
      "Schema design",
      "Indexing",
      "Query optimisation",
      "Caching",
    ],
  },
  {
    title: "AI & ML",
    lead: true,
    skills: [
      "Google Gemini API",
      "LangChain",
      "RAG",
      "Vector databases",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "pandas",
      "NumPy",
    ],
  },
  {
    title: "Frontend & Web",
    skills: [
      "React.js",
      "HTML5",
      "CSS3",
      "Reusable component design",
      "State management",
      "Asynchronous data fetching",
      "JSON",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Render",
      "Postman",
    ],
  },
  {
    title: "Fundamentals",
    skills: [
      "Data structures & algorithms",
      "Object-oriented programming",
      "System design",
      "Design patterns",
      "Complexity analysis",
    ],
  },
  {
    title: "Practices",
    skills: [
      "Agile & Scrum",
      "Code reviews",
      "Unit & integration testing (Jest, JUnit)",
      "Debugging & root cause analysis",
      "Technical documentation",
    ],
  },
];


export function Skills() {
  const { ref, reveal } = useReveal();

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Skills
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              What I work with
            </h2>
            <p className="text-muted-foreground text-lg">
              Backend first, because that is where most of the work happens.
              The AI stack is the part I reach for when a problem genuinely needs
              judgement rather than a parser.
            </p>
          </div>

          {/* Skills grid */}
          <div className="space-y-4">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                {...reveal(0.06 * categoryIndex)}
                className={
                  category.lead
                    ? "card-elevated p-5 rounded-xl border-l-2 border-l-primary"
                    : "p-5 rounded-xl card-glass"
                }
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
