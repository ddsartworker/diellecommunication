import SectionHead from "./section-head";
import Reveal from "./reveal";
import { testimonials } from "@/lib/site";

// Una citazione può arrivare come stringa o come elenco di righe: sul desktop
// ogni riga va a capo dove l'abbiamo decisa noi, sugli schermi stretti torna a
// scorrere di seguito (i blocchi diventano di nuovo testo in linea).
//
// Le virgolette stanno **dentro** la prima e l'ultima riga, non fuori dai
// blocchi: da fuori finivano ognuna su una riga tutta sua, sopra e sotto la
// citazione, invece che attaccate al testo.
function Quote({ text }: { text: string | string[] }) {
  const righe = Array.isArray(text) ? text : [text];

  return (
    <>
      {righe.map((riga, i) => (
        <span key={riga} className="lg:block">
          {i > 0 ? " " : null}
          {i === 0 ? "«" : null}
          {riga}
          {i === righe.length - 1 ? "»" : null}
        </span>
      ))}
    </>
  );
}

// Le firme (nome, ruolo, locale, città) sono lunghe: la più lunga sfiora i
// 100 caratteri. Con la spaziatura da micro-etichetta (0.16em) occupavano
// ~860px e andavano a capo dentro una colonna larga ~600px. Stanno su una riga
// sola solo a corpo piccolo e con la spaziatura quasi azzerata: a 0.62rem con
// tracking 0.01em ne servono ~565, il massimo che entra. A questo corpo la
// leggibilità la fa il contrasto più della dimensione, per questo le firme
// stanno a `text-cream/70` e non a /50 come le altre micro-etichette.
export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    // Tinta unita `navy-deep`, come il metodo e gli strumenti: chiude
    // l'alternanza con i servizi, che stanno su fondo a gradiente.
    <section className="bg-navy-deep py-[108px] text-cream">
      <div className="shell">
        {/* Stessa intestazione di tutte le altre sezioni: titolo centrato,
            stessa scala, stesso colore unico. */}
        <SectionHead title="Non fidarti di noi. Fidati di chi ci ha provato." />

        {lead && (
          <Reveal delay={80}>
            {/* La citazione principale sta sull'asse centrale come il titolo:
                prima era a filo sinistro e sembrava sfalsata. */}
            <blockquote className="mx-auto mt-14 max-w-4xl text-center">
              <p className="display text-[clamp(1.35rem,3vw,2.2rem)] leading-[1.18] text-cream">
                <Quote text={lead.quote} />
              </p>
              <footer className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.01em] text-cream/70">
                {lead.author} — {lead.detail}
              </footer>
            </blockquote>
          </Reveal>
        )}

        {/* Le altre due restano allineate a sinistra: sono contenuti in
            colonna, e lì il testo si legge meglio a filo. */}
        <div className="mt-16 grid gap-10 border-t border-cream/10 pt-12 sm:grid-cols-2 sm:gap-14">
          {rest.map((t, i) => (
            <Reveal key={t.author + i} delay={120 + i * 80}>
              <p className="text-xl leading-relaxed text-cream/75">
                <Quote text={t.quote} />
              </p>
              <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.01em] text-cream/70">
                {t.author} — {t.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
