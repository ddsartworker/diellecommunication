import Link from "next/link";
import Logo from "./logo";
import { social, site } from "@/lib/site";

// Il footer fa da indice del sito: punta alle pagine dedicate
// (l'header resta invece la navigazione one-page con scroll alle sezioni).
const footerLinks = [
  { label: "Metodo", href: "/metodo" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Lavori", href: "/lavori" },
  { label: "Blog", href: "/blog" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Periodo di prova", href: "/prova" },
  { label: "Contatti", href: "/contatti" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="shell flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-dim">
            {site.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-cream"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell mt-10 border-t border-white/5 pt-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-navy-dim">
          © {new Date().getFullYear()} {site.name} — {site.founders}
        </p>
      </div>
    </footer>
  );
}
