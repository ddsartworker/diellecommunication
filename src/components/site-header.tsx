"use client";

import { useEffect, useState } from "react";
import Cta from "./cta";
import Logo from "./logo";
import { booking, nav, site, social } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Blocca lo scroll del body quando il pannello è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // La barra scorre via con la pagina (come sul riferimento, dove è
    // `position: static`): non resta incollata in alto. Niente fondo e niente
    // bordo, mai: appoggia sull'apertura ed è la stessa superficie.
    // `absolute` invece di `static` perché così non occupa spazio nel flusso e
    // l'apertura parte davvero dal margine dello schermo.
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="shell flex items-center justify-between py-7 sm:py-9">
        <Logo />

        {/* Le distanze si stringono a 1024px: lì dentro devono stare marchio,
            sei voci, il pulsante e il "+". Si riaprono a 1280 in su. */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-10 2xl:gap-14">
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

        <div className="flex items-center gap-4">
          {/* Stesso pulsante dell'apertura, e stessa destinazione: scende
              alla sezione della prova, non apre il calendario. Chi è appena
              arrivato prima deve sapere cosa sta prenotando. */}
          <Cta href="/#prova" size="sm" className="hidden lg:inline-flex">
            {booking.label}
          </Cta>

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
      </div>

      {/* Pannello a discesa. Da chiuso non deve dipingere nulla: il bordo di
          1px lasciava intravedere il fondo bianco sotto la barra, ed è quella
          la riga che si vedeva sopra l'apertura. */}
      <div
        // Il pannello è bianco con testo blu in tutti e due i temi: inchiodato
        // al tema scuro, altrimenti a tema chiaro sarebbe bianco su bianco.
        data-theme="dark"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "grid-rows-[1fr] border-t border-navy/10 bg-white"
            : "grid-rows-[0fr] border-t-0 bg-transparent"
        }`}
      >
        <div className="min-h-0">
          <div className="shell py-10 sm:py-14">
            {/* Info cliccabili (sopra) */}
            <div className="grid gap-8 border-b border-navy/10 pb-10 sm:grid-cols-3">
              <a href={`mailto:${site.email}`} className="group block">
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-saffron">
                  Scrivici
                </span>
                <p className="display mt-3 text-sm text-navy underline-offset-4 transition-colors duration-300 group-hover:text-saffron group-hover:underline group-hover:decoration-saffron">
                  {site.email}
                </p>
              </a>
              <div>
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-saffron">
                  Dove siamo
                </span>
                <p className="display mt-3 text-sm leading-relaxed text-navy">
                  {site.location}
                </p>
              </div>
              <div>
                <span className="display text-[0.7rem] uppercase tracking-[0.2em] text-saffron">
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

            {/* Lo stesso pulsante della barra: sotto i 1024px la barra non
                c'è, e questa è l'unica via alla prova dentro il menu. */}
            <Cta
              href="/#prova"
              className="mt-8"
              onClick={() => setOpen(false)}
            >
              {booking.label}
            </Cta>
          </div>
        </div>
      </div>
    </header>
  );
}
