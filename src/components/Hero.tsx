import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { value: "1,000+/day", label: "payments through backend services I built" },
  { value: "−30%", label: "failed payments after making endpoints idempotent" },
  { value: "6", label: "payment methods behind one interface" },
  { value: "50+", label: "machines kept in sync by four services" },
  { value: "80%+", label: "automated test coverage on services I owned" },
  { value: "1st", label: "place, solo, Gemini-sponsored hackathon" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border/50 mb-8"
          >
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Open to backend / AI engineering roles · Remote or relocating
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...rise(0.1)}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Naga Sai Ram <span className="gradient-text">Sunkara</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            {...rise(0.2)}
            className="text-lg md:text-xl text-muted-foreground font-medium mb-6"
          >
            Backend Engineer{" "}
            <span className="text-foreground/40">|</span>{" "}
            <span className="text-primary">Java · Spring Boot · Node.js · Python</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...rise(0.3)}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
          >
            Six months of production experience building and debugging backend
            services that handle around{" "}
            <span className="text-foreground font-medium">1,000 payments a day</span>.
            Four deployed projects, 900+ solved problems, and a Gemini and OCR
            pipeline that won a hackathon solo. I pick up unfamiliar codebases
            fast, get something usable running, then make it correct.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...rise(0.4)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <a href="#projects">
              <Button variant="hero" size="lg">
                View Projects
                <ArrowDown className="h-4 w-4 ml-1" />
              </Button>
            </a>
            <div className="flex items-center gap-3">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="lg">
                  <FileText className="h-5 w-5" />
                  Resume
                </Button>
              </a>
              <a
                href="https://github.com/NagaSaiRam89"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="heroOutline" size="lg">
                  <Github className="h-5 w-5" />
                  GitHub
                </Button>
              </a>
              <a href="#contact">
                <Button variant="heroOutline" size="icon" className="h-12 w-12" aria-label="Contact">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Proof strip — every figure matches the resume */}
          <motion.dl
            {...rise(0.5)}
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/60 border border-border/60 rounded-xl overflow-hidden text-left"
          >
            {metrics.map((metric) => (
              <div
                key={metric.value}
                className="bg-background/80 backdrop-blur-sm p-4"
              >
                <dt className="text-xl md:text-2xl font-bold tracking-tight tabular-nums">
                  {metric.value}
                </dt>
                <dd className="text-xs text-muted-foreground leading-snug mt-1">
                  {metric.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
