import Link from "next/link";
import Cta from "./cta";
import Logo from "./logo";
import { booking, company, footer, site, whatsappUrl } from "@/lib/site";

// Impianto ripreso da leftclick.ai, il riferimento indicato da Dario: a
// sinistra l'invito con il pulsante, a destra le colonne di link, e sotto una
// riga di chiusura con marchio, note legali e copyright.
//
// I contenuti — invito, colonne, link legali — stanno in `footer` dentro
// `site.ts`: qui c'è solo l'impaginazione.

function FooterLink({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled?: boolean;
}) {
  // `py-2 -my-2` allarga il bersaglio del dito senza spostare niente a
  // schermo: l'area cliccabile passa da 17px di altezza a 33, il margine
  // negativo restituisce lo spazio che il padding aveva preso. Senza,
  // sul telefono questi link erano alti 17px — sotto il minimo di 24px
  // delle linee guida di accessibilità, e ben sotto i 44 consigliati.
  const classi =
    "inline-block py-2 -my-2 text-[0.95rem] text-cream/60 transition-colors duration-300 hover:text-cream";

  // Una voce spenta non è un link: è testo. Non `<a>` con `pointer-events`
  // tolti — quello resta annunciato come link da un lettore di schermo e
  // resta raggiungibile con il tabulatore, cioè promette qualcosa che non
  // succede. `aria-disabled` lo dice a chi ascolta, il colore a chi guarda.
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="inline-block cursor-default py-2 -my-2 text-[0.95rem] text-cream/30"
      >
        {label}
      </span>
    );
  }

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
    // `navy-ink`, lo stesso blu d'inchiostro del nastro dei clienti: il più
    // profondo della tavolozza. La chiusura stacca da tutto quello che ha
    // sopra.
    //
    // Resta scuro anche a tema chiaro, per scelta di Dario: come gli
    // strumenti e i contatti, è una delle tre fasce che non cambiano mai.
    <footer
      data-theme="dark"
      className="bg-navy-ink border-t border-cream/10 pb-10 pt-[72px]"
    >
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

          {/* I recapiti stanno qui e non in una colonna di link. Il footer è
              il posto dove la gente scende apposta a cercarli, e per
              un'attività locale averli scritti per esteso su ogni pagina
              conta anche per farsi trovare su Google. Prima «Contatti»
              compariva due volte in due colonne diverse: ora zero volte, e
              al suo posto ci sono le informazioni vere. */}
          {/* `gap-1` invece di `gap-2` perché i due link portano ora
              `py-1.5`: lo spazio fra le righe resta quello di prima, ma
              l'area che intercetta il dito passa da 20px a 32. Sono i due
              recapiti che la gente scende a cercare apposta, ed erano i più
              stretti della pagina. */}
          <address className="mt-10 flex flex-col gap-1 not-italic">
            <a
              href={`mailto:${site.email}`}
              className="inline-block py-1.5 text-[0.95rem] text-cream underline decoration-cream/40 decoration-1 underline-offset-4"
            >
              {site.email}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1.5 text-[0.95rem] text-cream/60 transition-colors duration-300 hover:text-cream"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream/45">
              {site.location}
            </p>
          </address>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/40">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} disabled={link.disabled} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Riga di chiusura: marchio a sinistra, note legali al centro,
          copyright a destra. */}
      <div className="shell mt-16 flex flex-col gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
        <Logo size={56} />

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
