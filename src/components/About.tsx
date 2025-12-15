import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Server, Zap } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "MCA @ NIT Raipur",
    description: "2023–2026",
  },
  {
    icon: Code2,
    title: "Full-Stack Developer",
    description: "MERN Stack Expert",
  },
  {
    icon: Server,
    title: "System Design",
    description: "Scalable Architecture",
  },
  {
    icon: Zap,
    title: "DSA & Problem Solving",
    description: "900+ Problems Solved",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
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
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Engineering-focused developer
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              I'm a Master's student at{" "}
              <span className="text-foreground font-medium">NIT Raipur</span>{" "}
              with a passion for building production-grade software. My focus is on{" "}
              <span className="text-foreground font-medium">clean code</span>,{" "}
              <span className="text-foreground font-medium">test-driven development</span>, and{" "}
              <span className="text-foreground font-medium">scalable system design</span>.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-elevated p-5 rounded-xl group hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Extended bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 p-6 card-glass rounded-xl"
          >
            <p className="text-muted-foreground leading-relaxed">
              My engineering philosophy centers on building systems that are{" "}
              <span className="text-foreground">fault-tolerant</span>,{" "}
              <span className="text-foreground">maintainable</span>, and{" "}
              <span className="text-foreground">performant</span>. I've worked on async processing systems, 
              real-time applications, and complex data pipelines. When I'm not coding, 
              I'm solving algorithmic challenges or exploring new technologies to expand my toolkit.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
