import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "nagasairam.sunkara@gmail.com",
    href: "mailto:nagasairam.sunkara@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/nagasairam17",
    href: "https://linkedin.com/in/nagasairam17",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/nagasairam17",
    href: "https://github.com/nagasairam17",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-sm font-mono text-primary tracking-wider uppercase">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Let's connect
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Open to opportunities, collaborations, and interesting conversations about technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {contactLinks.map((link, index) => (
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

            {/* Contact form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
