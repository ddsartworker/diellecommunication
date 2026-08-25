import Link from "next/link";
import Reveal from "./reveal";
import { method } from "@/lib/site";

export default function Method() {
  return (
    <section
      id="metodo"
      className="bg-navy-deep section-y"
    >
      <div className="shell">
        {/* Titolo e sottotitolo sull'asse centrale; l'elenco dei passi sotto
            resta allineato a sinistra, dove si legge. */}
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.7rem,4vw,3rem)]">
            <span className="display text-cream">Un metodo</span>{" "}
            <span className="display text-cream">sartoriale.</span>
          </h2>
          {/* La frase è di Dario, 25 agosto 2026, e sta anche in apertura di
              `/metodo`: è la risposta alla domanda «cosa succede se decido di
              lavorare con voi». Prima qui c'era «niente pacchetti uguali per
              tutti», che il sito ripete in altri quattro punti — sottotitolo
              di /chi-siamo, `notBody`, la tabella di confronto, la FAQ sui
              prezzi. Questa invece dice una cosa che non stava scritta da
              nessuna parte: le decisioni si prendono insieme. */}
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg text-cream/60">
            <span className="block">
              Nessuno conosce il tuo lavoro come te: il marketing non si
              subisce, si fa insieme.
            </span>
            <span className="block">
              Ci sentiamo, e ogni passo lo decidiamo con te.
            </span>
          </p>
        </Reveal>

        {/* The thread that stitches the steps together */}
        <ol className="relative mt-16 space-y-px before:absolute before:left-[1.15rem] before:top-3 before:bottom-3 before:w-px before:bg-cream/15">
          {method.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 70}
              className="relative grid grid-cols-[2.4rem_1fr] gap-x-5 gap-y-3 py-7 lg:grid-cols-[2.4rem_21rem_1fr] lg:items-baseline lg:gap-x-10 lg:gap-y-0"
            >
              <span className="relative z-10 row-span-2 flex size-[2.4rem] items-center justify-center rounded-full border border-cream/15 bg-navy-deep font-mono text-xs text-saffron md:row-span-1">
                {step.n}
              </span>
              <h3 className="self-center font-sans text-2xl font-semibold tracking-tight text-cream sm:text-3xl md:self-auto md:whitespace-nowrap">
                {step.title}
              </h3>
              <p className="col-start-2 leading-relaxed text-cream/65 md:col-start-3 md:row-start-1">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <Link
            href="/metodo"
            className="group mt-12 inline-flex items-center gap-2 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream/65 transition-colors hover:text-saffron"
          >
            Scopri il metodo in dettaglio
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
