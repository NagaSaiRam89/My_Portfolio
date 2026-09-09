import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Server, Zap } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const highlights = [
  {
    icon: GraduationCap,
    title: "MCA, NIT Raipur",
    description: "2023–2026",
  },
  {
    icon: Server,
    title: "Production Backend",
    description: "Payments, integrations, 6 months",
  },
  {
    icon: Sparkles,
    title: "AI where it earns it",
    description: "Gemini, RAG, agents",
  },
  {
    icon: Zap,
    title: "DSA & Problem Solving",
    description: "900+ problems solved",
  },
];


export function About() {
  const { ref, reveal } = useReveal();

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Backend work, and the judgement calls around it
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              I finished my{" "}
              <span className="text-foreground font-medium">MCA at NIT Raipur</span>{" "}
              in 2026 and spent six months at Antino Labs on the unglamorous
              part of backend work: making{" "}
              <span className="text-foreground font-medium">
                two payment providers that agreed on nothing
              </span>{" "}
              look like one interface, and keeping the whole thing correct when
              the same request arrives twice.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                {...reveal(0.1 * index)}
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
          <motion.div {...reveal(0.5)} className="mt-12 p-6 card-glass rounded-xl">
            <p className="text-muted-foreground leading-relaxed">
              Most of what I build is ordinary backend work done carefully:
              idempotency and observability first, because those are the
              properties you cannot retrofit. Where a model is involved, I care
              about the boundary — the model does the part that genuinely needs
              judgement, like reading a page of handwriting, and everything that
              has to be reproducible stays{" "}
              <span className="text-foreground">a fixed algorithm outside it</span>.
              That is how SnapStudy works, and it is why its schedules come out
              the same every time you run them.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
