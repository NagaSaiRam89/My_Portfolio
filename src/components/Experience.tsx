import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, TrendingUp } from "lucide-react";

const experiences = [
  {
    role: "Junior Web Developer",
    company: "V-Info Technologies",
    type: "Startup",
    period: "2023",
    description:
      "Contributed to web development projects in an agile startup environment, focusing on performance optimization and feature delivery.",
    achievements: [
      "Improved application performance contributing to 30% traffic increase",
      "Participated in agile development cycles and code reviews",
      "Independently delivered feature implementations end-to-end",
      "Collaborated with cross-functional teams on product decisions",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
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
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Professional journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Real-world experience building products and shipping code.
            </p>
          </div>

          {/* Experience cards */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-elevated p-6 md:p-8 rounded-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <span className="font-medium text-foreground">{exp.company}</span>
                        <span className="text-foreground/30">·</span>
                        <span className="text-sm">{exp.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground md:text-right">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Key Achievements
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
