"use client";

import { useEffect, useState } from "react";
import Logo from "./logo";
import { nav, site, social } from "@/lib/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blocca lo scroll del body quando il pannello è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-navy transition-colors duration-500 ${
        scrolled || open ? "border-b border-white/5" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 sm:px-10 sm:py-9">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex xl:gap-14">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-0 after:bg-cream after:opacity-0 after:transition-[width,opacity] after:duration-700 after:ease-out hover:after:w-full hover:after:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Toggle "+" — apre il pannello con info + link */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          className="group flex size-10 items-center justify-center"
        >
          <span
            className={`relative block size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "rotate-[135deg]" : ""
            }`}
          >
            <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-cream transition-colors group-hover:bg-saffron" />
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-cream transition-colors group-hover:bg-saffron" />
          </span>
        </button>
      </div>

      {/* Pannello a discesa */}
      <div
        className={`grid overflow-hidden border-t bg-white transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] border-navy/10" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="min-h-0">
          <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
            {/* Info cliccabili (sopra) */}
            <div className="grid gap-8 border-b border-navy/10 pb-10 sm:grid-cols-3">
              <a href={`mailto:${site.email}`} className="group block">
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-mint">
                  Scrivici
                </span>
                <p className="display mt-3 text-sm text-navy transition-colors group-hover:text-saffron">
                  {site.email}
                </p>
              </a>
              <div>
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-mint">
                  Dove siamo
                </span>
                <p className="display mt-3 text-sm leading-relaxed text-navy">
                  {site.location}
                </p>
              </div>
              <div>
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-mint">
                  Seguici
                </span>
                <ul className="mt-3 space-y-2">
                  {social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="display text-sm text-navy transition-colors hover:text-saffron"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Link di navigazione (sotto) */}
            <nav className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-navy/10 py-4"
                >
                  <span className="display text-2xl text-navy transition-colors group-hover:text-saffron sm:text-3xl">
                    {item.label}
                  </span>
                  <span className="font-mono text-saffron opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
