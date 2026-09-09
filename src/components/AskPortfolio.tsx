import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CornerDownLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

const SUGGESTIONS = [
  "Has he used Kafka in production?",
  "What was the hardest bug he's fixed?",
  "How does SnapStudy actually work?",
];

type Exchange = {
  question: string;
  answer?: string;
  sources?: string[];
  error?: string;
};

export function AskPortfolio() {
  const { ref, reveal } = useReveal();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [draft, setDraft] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isAsking) return;

    setDraft("");
    setIsAsking(true);
    setExchanges((prev) => [...prev, { question: trimmed }]);

    const settle = (patch: Partial<Exchange>) =>
      setExchanges((prev) =>
        prev.map((item, i) => (i === prev.length - 1 ? { ...item, ...patch } : item))
      );

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      // A static preview has no serverless function behind it.
      if (response.status === 404) {
        settle({
          error:
            "The assistant only runs on the deployed site. Everything it knows is on this page anyway — or email ramhere939@gmail.com.",
        });
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        settle({ error: data.error || "Something went wrong. Try again." });
        return;
      }

      settle({ answer: data.answer, sources: data.sources });
    } catch {
      settle({
        error:
          "Couldn't reach the assistant. Email ramhere939@gmail.com and it'll get to him directly.",
      });
    } finally {
      setIsAsking(false);
      inputRef.current?.focus();
    }
  };

  return (
    <section id="ask" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Ask
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Ask this portfolio anything
            </h2>
            <p className="text-muted-foreground text-lg">
              Retrieval over my résumé, projects and case study — grounded in
              those documents and citing which one it used. Built the same way
              as the retrieval systems described above.
            </p>
          </div>

          <div className="card-elevated rounded-xl overflow-hidden">
            {/* Transcript */}
            <div className="p-5 md:p-6 space-y-5 min-h-[9rem]">
              {exchanges.length === 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed pt-1.5">
                    Ask about his experience, a specific technology, or how one
                    of the projects is put together. If the answer isn't in his
                    documents, it will say so rather than guess.
                  </div>
                </div>
              )}

              {exchanges.map((exchange, index) => (
                <div key={index} className="space-y-3">
                  <p className="font-medium text-sm">{exchange.question}</p>

                  {exchange.answer && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-2 pt-1">
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {exchange.answer}
                        </p>
                        {exchange.sources && exchange.sources.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {exchange.sources.map((source) => (
                              <span
                                key={source}
                                className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {exchange.error && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">
                        {exchange.error}
                      </p>
                    </div>
                  )}

                  {!exchange.answer && !exchange.error && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Looking through his documents…
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Composer */}
            <div className="border-t border-border/50 p-4 md:p-5 bg-muted/20">
              {exchanges.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => ask(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full border border-border bg-background hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(draft);
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="ask-input" className="sr-only">
                  Ask a question about this portfolio
                </label>
                <input
                  id="ask-input"
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={400}
                  disabled={isAsking}
                  placeholder="Ask a question…"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm disabled:opacity-60"
                />
                <Button type="submit" size="sm" disabled={isAsking || !draft.trim()}>
                  {isAsking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CornerDownLeft className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
