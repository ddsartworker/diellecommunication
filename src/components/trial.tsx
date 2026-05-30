import Reveal from "./reveal";
import { trial } from "@/lib/site";

export default function Trial() {
  return (
    <section id="prova" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-saffron/25 bg-gradient-to-br from-saffron/15 via-navy-2/40 to-mint/10 p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-[28rem] rounded-full bg-saffron/15 blur-[110px]"
          />

          <div className="relative">
            <p className="kicker text-saffron">L&apos;elemento distintivo</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.6rem,3.8vw,2.7rem)]">
              <span className="display text-cream">
                Prima di chiederti fiducia,
              </span>{" "}
              <span className="display text-saffron">
                preferiamo dimostrarti il nostro valore.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
              Inizia con un periodo di prova gratuito. Se ti convince,
              continuiamo insieme. Se no, ci siamo costati solo qualche giorno.
            </p>

            <ol className="mt-12 grid gap-px sm:grid-cols-3">
              {trial.steps.map((step) => (
                <li
                  key={step.n}
                  className="flex flex-col gap-3 border-t border-cream/15 pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="font-mono text-sm text-saffron">{step.n}</span>
                  <h3 className="text-xl font-semibold tracking-tight text-cream">
                    {step.title}
                  </h3>
                  <p className="text-cream/65 leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {trial.reassurance.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/60"
                  >
                    <span className="text-mint">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contatti"
                className="shrink-0 rounded-full bg-saffron px-7 py-3.5 text-center text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2"
              >
                Richiedi la prova gratuita
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
