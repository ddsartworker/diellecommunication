import Cta from "./cta";
import Reveal from "./reveal";
import { trial } from "@/lib/site";

export default function Trial() {
  return (
    <section id="prova" className="py-[108px]">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-saffron/25 bg-gradient-to-br from-saffron/15 via-navy-2/40 to-saffron/10 p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-[28rem] rounded-full bg-saffron/15 blur-[110px]"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-4xl text-balance text-center text-[clamp(1.6rem,3.8vw,2.7rem)]">
              <span className="display text-cream">
                Prima di chiederti fiducia, preferiamo dimostrarti il nostro
                valore.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-lg leading-relaxed text-cream/70">
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
                    <span className="text-saffron">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Cta href="#contatti" className="shrink-0">
                Richiedi la prova gratuita
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
