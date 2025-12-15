import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Code2, Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const codingProfiles = [
  {
    platform: "LeetCode",
    problems: "600+",
    description: "Problems solved with focus on DSA fundamentals",
    url: "https://leetcode.com/u/ramhere939/",
    color: "text-amber-500",
  },
  {
    platform: "GeeksforGeeks",
    problems: "300+",
    description: "Practice across algorithms and data structures",
    url: "https://www.geeksforgeeks.org/profile/ramher550c",
    color: "text-green-500",
  },
];

const repoHighlights = [
  "MERN Full-Stack Applications",
  "Machine Learning Projects",
  "Java Backend Systems",
  "Data Visualization Dashboards",
  "Algorithm Implementations",
];

export function GitHubActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative">
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
              Coding Activity
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Consistent problem solver
            </h2>
            <p className="text-muted-foreground text-lg">
              Demonstrating consistency through competitive programming and open source contributions.
            </p>
          </div>

          {/* Coding profiles */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {codingProfiles.map((profile, index) => (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-elevated p-6 rounded-xl group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Trophy className={`h-5 w-5 ${profile.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.platform}</h3>
                      <p className="text-2xl font-bold gradient-text">{profile.problems}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{profile.description}</p>
              </motion.a>
            ))}
          </div>

          {/* GitHub section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-elevated p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Github className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">GitHub Repositories</h3>
                <p className="text-sm text-muted-foreground">Diverse tech stack across projects</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {repoHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  {highlight}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/NagaSaiRam89/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <Github className="h-4 w-4 mr-2" />
                View GitHub Profile
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
