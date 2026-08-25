import SectionHead from "./section-head";
import Reveal from "./reveal";
import ContactForm from "./contact-form";
import { contactSection, site, social } from "@/lib/site";

export default function Contact({ glow = false }: { glow?: boolean }) {
  return (
    <section
      id="contatti"
      // Resta scura anche a tema chiaro, per scelta di Dario: è la sezione
      // del modulo, e deve staccare da tutto il resto.
      data-theme="dark"
      // `glow` mette il gradiente al posto della tinta unita. Serve dove la
      // sezione **sopra** è già in tinta unita: due fasce `navy-deep`
      // attaccate si fondono in una sola e il modulo sembra la coda della
      // sezione precedente. Oggi lo usa `/lavori`, dove la griglia è in tinta
      // unita — richiesta di Dario, ed è la stessa regola dell'alternanza
      // che vale in tutto il sito. Il gradiente resta quello scuro anche a
      // tema chiaro, perché la sezione è inchiodata con `data-theme`.
      className={`${glow ? "surface-glow" : "bg-navy-deep"} section-y`}
    >
      <div className="shell">
        {/* Titolo e corpo stanno in `site.ts`: erano scritti qui e, quasi
            uguali, dentro `inner-cta.tsx`. */}
        <SectionHead
          size="lg"
          title={contactSection.title}
          body={contactSection.body}
        />
      </div>

      {/* Due colonne da 1024px. A 768 il modulo si stringeva a ~296px e i
          campi affiancati al suo interno finivano a 140px l'uno: sul tablet
          verticale conviene la colonna piena. */}
      <div className="shell mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="space-y-5">
            <a
              href={`mailto:${site.email}`}
              // `overflow-wrap:anywhere` non è un vezzo: l'indirizzo è una
              // parola sola di 36 caratteri, e a 20px misura più della gabbia
              // su un telefono stretto. Non potendo andare a capo allargava
              // la pagina oltre lo schermo, e siccome `body` ha
              // `overflow-x: hidden` non si vedeva un cursore di scorrimento:
              // si vedeva solo il contenuto tagliato a destra — compreso il
              // «+» del menu, che spariva del tutto sotto i ~440px. Andava
              // avanti da mesi ed era in «Da sistemare» come un problema del
              // menu, che non c'entrava niente.
              className="block text-lg font-semibold tracking-tight text-cream underline decoration-cream/40 decoration-1 underline-offset-[6px] [overflow-wrap:anywhere] sm:text-xl md:text-2xl"
            >
              {site.email}
            </a>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/50">
              {site.location}
            </p>
            {/* `text-[0.62rem]` è una misura da desktop, e nasce da un
                vincolo da desktop: da 1024px in su questa colonna sta accanto
                al modulo e le quattro voci devono entrare in una riga sola
                (~485px). Sotto quella soglia la colonna è piena e il vincolo
                non esiste, quindi il testo torna leggibile e il bersaglio
                tattile passa da 13px di altezza a 37. */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-cream/60 transition-colors hover:text-cream lg:py-0 lg:text-[0.62rem] lg:tracking-[0.12em]"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
