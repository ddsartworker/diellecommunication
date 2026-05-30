import Logo from "./logo";
import { nav, social, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-dim">
            {site.tagline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/55 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
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

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 pt-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-navy-dim">
          © {new Date().getFullYear()} {site.name} — {site.founders}
        </p>
      </div>
    </footer>
  );
}
