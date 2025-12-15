import { motion } from "framer-motion";
import { ArrowDown, Github, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 pt-20 pb-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border/50 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Naga Sai Ram{" "}
            <span className="gradient-text">Sunkara</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-medium mb-6"
          >
            Full-Stack Software Developer{" "}
            <span className="text-foreground/40">|</span>{" "}
            <span className="text-primary">MCA @ NIT Raipur</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
          >
            I design and build{" "}
            <span className="text-foreground font-medium">scalable, fault-tolerant web applications</span>{" "}
            with modern JavaScript and cloud technologies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="#projects">
              <Button variant="hero" size="lg">
                View Projects
                <ArrowDown className="h-4 w-4 ml-1" />
              </Button>
            </a>
            <div className="flex items-center gap-3">
              <a 
                href="https://drive.google.com/file/d/1R4KoG3st9Qx8aZrBbQvKkbieXvheB37N/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="heroOutline" size="lg">
                  <FileText className="h-5 w-5" />
                  Resume
                </Button>
              </a>
              <a 
                href="https://github.com/nagasairam17" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="heroOutline" size="lg">
                  <Github className="h-5 w-5" />
                  GitHub
                </Button>
              </a>
              <a href="#contact">
                <Button variant="heroOutline" size="icon" className="h-12 w-12">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
