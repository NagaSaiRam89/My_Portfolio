import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/nagasairam17", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/nagasairam17", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nagasairam.sunkara@gmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold gradient-text">NSR</span>
            <span className="text-muted-foreground text-sm">
              © {currentYear} Naga Sai Ram Sunkara
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
