import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Github, Trophy, Clock, Cpu, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const stack = [
  "React.js",
  "TypeScript",
  "Google Gemini API",
  "Tesseract OCR",
  "PDF.js",
];

/** Left of the boundary the model decides; right of it nothing does. */
const modelStages = [
  {
    title: "Ingest",
    body: "A photo of handwritten notes, or a PDF up to 50+ pages. Two completely different input shapes.",
  },
  {
    title: "Normalise",
    body: "PDF.js pulls the text layer where one exists; Tesseract OCRs the pages and photos where it does not. Both paths converge on plain text before anything else runs.",
  },
  {
    title: "Extract",
    body: "Gemini reads that text and returns structured topics — the one step that genuinely needs judgement, because no parser survives real handwriting.",
  },
];

const fixedStages = [
  {
    title: "Schedule",
    body: "A fixed algorithm turns the extracted topics into a study plan. Same topics in, same plan out, every single time.",
  },
  {
    title: "Present",
    body: "The React front end renders the plan. Nothing here calls a model.",
  },
];

export default function CaseSnapStudy() {
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rise = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header — the main nav is anchor-based and belongs to the home page */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          {/* Title block */}
          <motion.div {...rise(0)}>
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Case study
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4 tracking-tight text-balance">
              SnapStudy AI
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Turning handwritten notes and long PDFs into a study plan — where
              the model does the reading and a fixed algorithm does the
              scheduling.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                <Trophy className="h-4 w-4" />
                1st place · Connect N Code 2026
              </span>
              <a
                href="https://github.com/ramhere939/snapstudyai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  Code
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pb-8 mb-10 border-b border-border">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Constraints up front — they explain every decision below */}
          <motion.div {...rise(0.1)} className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Clock, label: "Timebox", value: "One hackathon window" },
              { icon: Cpu, label: "Team", value: "Solo — scope to build" },
              { icon: Lock, label: "Hard rule", value: "Reproducible output" },
            ].map((item) => (
              <div key={item.label} className="card-elevated p-4 rounded-xl">
                <item.icon className="h-4 w-4 text-primary mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* The problem */}
          <motion.section {...rise(0.15)} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The problem</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Students already have the material. What they do not have is a
                plan for it — and the material arrives in the least structured
                form imaginable: a phone photo of a page of handwriting, or a
                fifty-page PDF someone scanned once and never looked at again.
              </p>
              <p>
                Neither of those is parseable by ordinary means. A regex will not
                read handwriting, and a PDF that is really a stack of images has
                no text layer to extract. That is exactly the shape of problem a
                model is genuinely good at, so the model gets that job and only
                that job.
              </p>
            </div>
          </motion.section>

          {/* The decision — the spine of the whole case study */}
          <motion.section {...rise(0.2)} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The decision that mattered</h2>
            <div className="p-5 rounded-xl bg-accent/40 border-l-2 border-primary mb-4">
              <p className="font-medium leading-relaxed">
                The model handles extraction. The scheduling logic stays a fixed
                algorithm rather than the model's judgement.
              </p>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It is tempting to hand the whole thing to the model — read the
                notes <em>and</em> plan the revision, one prompt, done. It demos
                well and it is faster to build, which in a hackathon is a real
                argument.
              </p>
              <p>
                I did not do that, because a study plan is something a user
                returns to. If the same notes produce a different schedule on
                Tuesday than they did on Monday, the tool is not trustworthy —
                and there is no way to explain the difference to the person
                using it. Scheduling is arithmetic over topics, dates and
                weightings. Arithmetic belongs in code, where it is
                deterministic, testable and cheap.
              </p>
              <p>
                So the boundary sits after extraction. Everything upstream of it
                is probabilistic and everything downstream is not. That single
                line is what the architecture below is arranged around.
              </p>
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section {...rise(0.25)} className="mb-12">
            <h2 className="text-2xl font-bold mb-2">How it fits together</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Two zones, one boundary. The interesting thing about the diagram is
              where it stops being a model.
            </p>

            <div className="rounded-xl border border-border overflow-hidden">
              {/* Probabilistic zone */}
              <div className="bg-primary/5 p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
                  Model's job · probabilistic
                </p>
                <ol className="space-y-3">
                  {modelStages.map((stage, index) => (
                    <li key={stage.title} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-mono font-semibold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{stage.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {stage.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* The boundary itself */}
              <div className="flex items-center gap-3 px-5 py-3 bg-background border-y border-dashed border-primary/40">
                <Lock className="h-4 w-4 text-primary shrink-0" />
                <p className="text-sm font-medium">
                  Structured topics cross the boundary. Nothing below here calls
                  a model.
                </p>
              </div>

              {/* Deterministic zone */}
              <div className="p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                  Fixed algorithm · deterministic
                </p>
                <ol className="space-y-3">
                  {fixedStages.map((stage, index) => (
                    <li key={stage.title} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-mono font-semibold flex items-center justify-center mt-0.5">
                        {modelStages.length + index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{stage.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {stage.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.section>

          {/* Scope under a timebox */}
          <motion.section {...rise(0.3)} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Building it inside the window</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A hackathon is a scoping exercise wearing a coding exercise's
                clothes. Working solo, every hour spent on one thing is an hour
                not spent on another, and the only deliverable that counts is
                something deployed and demoable at the end.
              </p>
              <p>
                So the two input paths — PDF text layer and OCR — were the first
                things built and the first things tested, because they are where
                real inputs break and there is no recovering from that late. The
                deterministic scheduler came next, since it can be verified
                without burning API calls. Prompt work came last, once there was
                real extracted text to test against rather than invented
                examples.
              </p>
              <p>
                It was scoped, built, deployed and demoed inside the competition
                window, and it took first place.
              </p>
            </div>
          </motion.section>

          {/* Honest reflection */}
          <motion.section {...rise(0.35)} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What I would change</h2>
            <ul className="space-y-3">
              {[
                "Caching extraction results per document. The same PDF re-uploaded pays the full model cost again, which is fine at demo scale and wrong at any other.",
                "A confidence signal from the OCR step. Right now bad OCR and good OCR reach the model looking identical, and the model has no way to know which it is holding.",
                "Evaluation on a fixed set of real documents, so a prompt change can be measured rather than eyeballed.",
                "Streaming the extraction step, so a fifty-page PDF shows progress instead of a spinner.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Close */}
          <motion.div
            {...rise(0.4)}
            className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-border"
          >
            <Link to="/#projects">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                All projects
              </Button>
            </Link>
            <Link to="/#contact">
              <Button className="w-full sm:w-auto">Get in touch</Button>
            </Link>
          </motion.div>
        </article>
      </main>
    </div>
  );
}
