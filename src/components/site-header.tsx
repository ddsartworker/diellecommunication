"use client";

import { useEffect, useState } from "react";
import Logo from "./logo";
import { nav } from "@/lib/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-navy/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#prova"
            className="rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2"
          >
            Prova gratuita
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Apri il menu"
          aria-expanded={open}
          className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden border-t border-white/5 bg-navy-deep transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display border-b border-white/5 py-4 text-lg text-cream"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#prova"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-saffron px-5 py-3 text-center text-sm font-semibold text-navy"
            >
              Prova gratuita
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
