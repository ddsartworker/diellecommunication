import SectionHead from "./section-head";
import Reveal from "./reveal";
import { testimonials } from "@/lib/site";

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
                «{lead.quote}»
              </p>
              <footer className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/50">
                {lead.author} — {lead.detail}
              </footer>
            </blockquote>
          </Reveal>
        )}

        {/* Le altre due restano allineate a sinistra: sono contenuti in
            colonna, e lì il testo si legge meglio a filo. */}
        <div className="mt-16 grid gap-10 border-t border-cream/10 pt-12 sm:grid-cols-2 sm:gap-14">
          {rest.map((t, i) => (
            <Reveal key={t.detail} delay={120 + i * 80}>
              <p className="text-xl leading-relaxed text-cream/75">«{t.quote}»</p>
              <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/50">
                {t.author} — {t.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
