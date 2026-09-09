import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Github, Trophy, ExternalLink, GitPullRequest, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

const GITHUB_USER = "NagaSaiRam89";

const codingProfiles = [
  {
    platform: "LeetCode",
    problems: "600+",
    description: "Problems solved, with a 160+ day unbroken streak",
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

const certifications = [
  "Postman API Fundamentals Student Expert",
  "AI & ML — NIT Kurukshetra",
  "Full Stack Development — Udemy",
];

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
};

async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) throw new Error("GitHub API unavailable");
  const repos: Repo[] = await response.json();
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

export function GitHubActivity() {
  const { ref, reveal } = useReveal();

  // Unauthenticated GitHub allows 60 req/h per IP, so cache generously.
  const { data: repos } = useQuery({
    queryKey: ["github-repos", GITHUB_USER],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return (
    <section id="achievements" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Open source &amp; achievements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Work that lives outside my own repos
            </h2>
            <p className="text-muted-foreground text-lg">
              Merged upstream contributions, competitive programming, and the
              certifications behind them.
            </p>
          </div>

          {/* Open source — the strongest signal here, so it leads */}
          <motion.div
            {...reveal(0.1)}
            className="card-elevated p-6 rounded-xl mb-4 border-l-2 border-l-primary"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <GitPullRequest className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  GirlScript Summer of Code 2026
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Code accepted after review by the project maintainers — written
                  to somebody else's standards, in somebody else's codebase, and
                  merged.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Coding profiles */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {codingProfiles.map((profile, index) => (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                {...reveal(0.2 + 0.1 * index)}
                className="card-elevated p-6 rounded-xl group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Trophy className={`h-5 w-5 ${profile.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.platform}</h3>
                      <p className="text-2xl font-bold gradient-text tabular-nums">
                        {profile.problems}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{profile.description}</p>
              </motion.a>
            ))}
          </div>

          {/* Certifications */}
          <motion.div {...reveal(0.4)} className="p-6 rounded-xl card-glass mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                Certifications
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Live repositories */}
          <motion.div {...reveal(0.5)} className="card-elevated p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Github className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Recent repositories</h3>
                <p className="text-sm text-muted-foreground">
                  Pulled live from GitHub
                </p>
              </div>
            </div>

            {repos && repos.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1.5 p-4 rounded-lg card-glass hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-medium truncate">
                        {repo.name}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 tabular-nums">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <span className="text-xs text-primary font-mono mt-auto pt-1">
                        {repo.language}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}

            <a
              href={`https://github.com/${GITHUB_USER}`}
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
