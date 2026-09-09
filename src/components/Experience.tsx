import { motion } from "framer-motion";
import { Building2, Calendar, TrendingUp, Bug } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const experience = {
  role: "Software Development Intern, Backend Engineering",
  company: "Antino Labs Pvt. Ltd.",
  type: "Backend, Payments & Integrations",
  period: "Jan – Jun 2026",
  location: "Bengaluru, Karnataka",
  description:
    "1,000+ payments a day run through backend services I built, connecting an internal platform to two outside payment companies that each had their own request format and error handling.",
  achievements: [
    "6 payment methods behind one interface, with new providers addable without rewriting what already worked — each plugs in as a separate module",
    "50+ machines kept in sync by four services I built, exchanging live data with hardware over a secure channel on AWS",
    "80%+ automated test coverage on the services I owned",
    "Shipped through Agile sprints with peer code reviews and releases that never took the system offline",
  ],
  story: {
    title: "The double-charge bug",
    body: "Payments were failing at random and some customers were charged twice. I reproduced the fault, traced it to endpoints that could not handle the same request arriving more than once, and rebuilt them to recognise and ignore repeats. Failed payments fell 30 percent.",
  },
};

const earlier = {
  role: "Junior Web Developer",
  company: "V-Info Technologies",
  period: "2023",
  note: "Feature delivery and performance work in an agile startup team.",
};

export function Experience() {
  const { ref, reveal } = useReveal();

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Production backend work
            </h2>
            <p className="text-muted-foreground text-lg">
              Building and debugging the services that move money, and the ones
              that keep hardware in the field talking to the platform.
            </p>
          </div>

          <motion.div {...reveal(0.1)} className="card-elevated p-6 md:p-8 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{experience.role}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground mt-1">
                    <span className="font-medium text-foreground">
                      {experience.company}
                    </span>
                    <span className="text-foreground/30">·</span>
                    <span className="text-sm">{experience.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-1 text-sm text-muted-foreground shrink-0">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {experience.period}
                </span>
                <span className="text-xs">{experience.location}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {experience.description}
            </p>

            {/* The one story worth telling in full */}
            <div className="mb-6 p-4 rounded-lg bg-accent/40 border-l-2 border-primary">
              <h4 className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                <Bug className="h-4 w-4 text-primary" />
                {experience.story.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {experience.story.body}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Also shipped
              </h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Earlier, kept short */}
          <motion.div
            {...reveal(0.2)}
            className="mt-4 flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 px-6 py-4 rounded-xl card-glass"
          >
            <span className="font-medium text-sm">{earlier.role}</span>
            <span className="hidden sm:inline text-foreground/30">·</span>
            <span className="text-sm text-muted-foreground">{earlier.company}</span>
            <span className="hidden sm:inline text-foreground/30">·</span>
            <span className="text-sm text-muted-foreground">{earlier.period}</span>
            <span className="text-sm text-muted-foreground sm:ml-auto">
              {earlier.note}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
