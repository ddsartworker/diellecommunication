import Cta from "./cta";
import SectionHead from "./section-head";
import Reveal from "./reveal";
import { booking, trial } from "@/lib/site";

export default function Trial() {
  return (
    // Fondo a gradiente. Vale sempre la stessa regola: guarda la sezione sopra
    // e prendi l'altro fondo — qui sopra c'è la vetrina dei lavori, che è in
    // tinta unita. Per mezza giornata questa sezione è stata `bg-navy-deep`,
    // nel periodo fra l'uscita delle testimonianze e l'arrivo della vetrina.
    <section id="prova" className="surface-glow section-y">
      <div className="shell">
        <SectionHead
          title="Prima di chiederti fiducia, preferiamo dimostrarti il nostro valore."
          body={[
            "Inizia con un periodo di prova gratuito. Se ti convince, continuiamo insieme.",
            "Se no, ci siamo costati solo qualche giorno.",
          ]}
        />

        {/* Le tre colonne sono divise da una linea verticale: `pr-7` tiene il
            testo alla stessa distanza dalla linea che ha `pl-7` dall'altra
            parte, così nessun punto finisce appiccicato al bordo. La prima
            parte a filo sinistro e l'ultima a filo destro, come la gabbia. */}
        {/* Tre colonne solo da 1024px in su. A 640, dove si aprivano prima, ogni
            colonna lasciava **158px di testo utile** — misurato — e «Mettiamo le
            mani in pasta» ci finiva su quattro righe. Fino a lì restano
            impilate, e la linea che le divide torna orizzontale. */}
        <Reveal as="ol" delay={80} className="mt-12 grid gap-px lg:grid-cols-3">
          {trial.steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col gap-3 border-t border-cream/15 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pr-7 lg:pt-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-mono text-sm text-saffron">{step.n}</span>
              <h3 className="text-xl font-semibold tracking-tight text-cream">
                {step.title}
              </h3>
              <p className="leading-relaxed text-cream/65">{step.body}</p>
            </li>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {trial.reassurance.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/60"
                >
                  <span className="text-saffron">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {/* Il `<div>` non è decorativo: sotto i 640px il contenitore è
                `flex-col`, e `<Cta>` senza involucro si stira per tutta la
                larghezza — il pallino con la freccia finisce lontanissimo dal
                testo e la pillola perde le proporzioni che ha ovunque. È la
                regola già scritta in AGENTS.md, che qui non era applicata. */}
            <div>
              <Cta href={booking.url} className="shrink-0">
                {booking.label}
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
