import Cta from "./cta";
import SectionHead from "./section-head";
import Reveal from "./reveal";
import { trial } from "@/lib/site";

export default function Trial() {
  return (
    // Fondo a gradiente come l'apertura: prima questa sezione era una scheda
    // di vetro arancione appoggiata sul blu di pagina, fuori dall'alternanza
    // sfumato / tinta unita del resto della home.
    <section id="prova" className="surface-glow py-[108px]">
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
        <Reveal as="ol" delay={80} className="mt-12 grid gap-px sm:grid-cols-3">
          {trial.steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col gap-3 border-t border-cream/15 pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pr-7 sm:pt-0 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
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
            <Cta href="#contatti" className="shrink-0">
              Richiedi la prova gratuita
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
