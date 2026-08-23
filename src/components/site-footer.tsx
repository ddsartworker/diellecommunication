import Link from "next/link";
import Cta from "./cta";
import Logo from "./logo";
import { booking, company, footer } from "@/lib/site";

// Impianto ripreso da leftclick.ai, il riferimento indicato da Dario: a
// sinistra l'invito con il pulsante, a destra le colonne di link, e sotto una
// riga di chiusura con marchio, note legali e copyright.
//
// I contenuti — invito, colonne, link legali — stanno in `footer` dentro
// `site.ts`: qui c'è solo l'impaginazione.

function FooterLink({ href, label }: { href: string; label: string }) {
  const classi =
    "text-[0.95rem] text-cream/60 transition-colors duration-300 hover:text-cream";

  // Gli indirizzi interni passano dal router, i profili social sono link
  // esterni e aprono una scheda nuova.
  return href.startsWith("/") ? (
    <Link href={href} className={classi}>
      {label}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classi}>
      {label}
    </a>
  );
}

export default function SiteFooter() {
  return (
    // Stessa superficie dell'apertura e della barra: `.surface-glow`, l'alone
    // radiale che schiarisce verso il centro. Il sito si apre e si chiude
    // sullo stesso fondo.
    <footer className="surface-glow border-t border-white/5 pb-10 pt-[72px]">
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        {/* L'invito: etichetta piccola, una riga che spiega cosa succede, il
            pulsante sotto. Come nel riferimento, ma con la pillola arancione
            che è l'unica azione forte del sito. */}
        <div>
          <p className="text-[0.95rem] text-cream/55">{footer.kicker}</p>
          <p className="mt-2 max-w-md text-pretty text-[1rem] leading-snug text-cream sm:text-[1.05rem]">
            {footer.lead}
          </p>
          <Cta href={booking.url} className="mt-8">
            {booking.label}
          </Cta>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/40">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Riga di chiusura: marchio a sinistra, note legali al centro,
          copyright a destra. */}
      <div className="shell mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <Logo />

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {footer.legalLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <p className="text-[0.95rem] text-cream/45">
          © {new Date().getFullYear()} {company.legalName}. {company.rights}
        </p>
      </div>
    </footer>
  );
}
