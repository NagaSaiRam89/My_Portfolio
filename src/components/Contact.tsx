import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Linkedin, Github, Send, ArrowUpRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/use-reveal";

const EMAIL = "ramhere939@gmail.com";

/**
 * Set VITE_CONTACT_ENDPOINT to a form relay (Formspree / Web3Forms) to enable
 * the form. Without it we show a direct-email panel rather than a form that
 * silently drops messages.
 */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/naga-sai-ram-sunkara-6302a8248",
    href: "https://www.linkedin.com/in/naga-sai-ram-sunkara-6302a8248",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/NagaSaiRam89",
    href: "https://github.com/NagaSaiRam89",
  },
  {
    icon: Code2,
    label: "LeetCode",
    value: "leetcode.com/u/ramhere939",
    href: "https://leetcode.com/u/ramhere939/",
  },
];

export function Contact() {
  const { ref, reveal } = useReveal();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(CONTACT_ENDPOINT as string, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      toast({
        title: "Message sent",
        description: "Thanks for reaching out — I'll reply within a day or two.",
      });
      form.reset();
    } catch {
      setError(
        `Couldn't send that. Email me directly at ${EMAIL} and I'll get it.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} {...reveal(0, 40)} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Let's connect
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Open to backend and AI engineering roles, and always up for a
              conversation about systems that have to stay correct under load.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact links */}
            <motion.div {...reveal(0.2)} className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 card-elevated rounded-xl group hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className="font-medium truncate">{link.value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </motion.div>

            {CONTACT_ENDPOINT ? (
              <motion.form
                {...reveal(0.3)}
                onSubmit={handleSubmit}
                className="card-elevated p-6 rounded-xl space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                {...reveal(0.3)}
                className="card-elevated p-6 rounded-xl flex flex-col justify-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email me directly</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The fastest way to reach me. I read everything and reply
                    within a day or two — happy to talk through any of the work
                    on this page in more detail.
                  </p>
                </div>
                <a href={`mailto:${EMAIL}`} className="mt-2">
                  <Button className="w-full">
                    {EMAIL}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
