import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { trial } from "@/lib/site";

export const metadata: Metadata = {
  title: "Periodo di prova gratuito — Provaci, poi decidi",
  description:
    "Prima di chiederti fiducia, preferiamo dimostrarti il nostro valore. Inizia con un periodo di prova gratuito: nessun impegno, nessuna carta richiesta.",
};

const include = [
  "Una call conoscitiva per capire la tua attività",
  "Un primo lavoro concreto su cui vedere come ci muoviamo",
  "Un confronto onesto sui risultati e sui prossimi passi",
];

const forYou = [
  "Hai un'attività e vuoi comunicare meglio",
  "Sei stanco di promesse e vuoi vedere fatti",
  "Cerchi qualcuno che ti segua di persona",
];

const notForYou = [
  "Cerchi solo il preventivo più basso",
  "Vuoi numeri gonfiati invece di risultati veri",
  "Non hai tempo per un confronto iniziale",
];

const faq = [
  {
    q: "Quanto costa la prova?",
    a: "Niente. Il periodo di prova è gratuito: serve a farti capire come lavoriamo, senza rischi per te.",
  },
  {
    q: "Devo lasciare i dati della carta?",
    a: "No. Nessuna carta, nessun rinnovo automatico, nessuna sorpresa.",
  },
  {
    q: "E se poi non voglio continuare?",
    a: "Nessun problema. Se non ti convince, ci salutiamo: ci sei costati solo qualche giorno di lavoro.",
  },
  {
    q: "Perché lo fate?",
    a: "Perché accettiamo pochi clienti e vogliamo lavorare bene con chi è davvero in linea con noi. La prova serve a capirlo, da entrambe le parti.",
  },
];

export default function ProvaPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-8 pt-36 sm:pt-44">
          <div className="shell">
            <p className="kicker text-saffron">L&apos;elemento distintivo</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(1.9rem,5.2vw,4rem)]">
              <span className="display text-cream">Provaci gratis.</span>{" "}
              <span className="display text-cream">Poi decidi.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Prima di chiederti fiducia, preferiamo dimostrarti il nostro valore.
              Inizia con un periodo di prova gratuito: se ti convince, continuiamo
              insieme. Se no, ci siamo costati solo qualche giorno.
            </p>
            <Link
              href="/#contatti"
              className="mt-8 inline-block rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2"
            >
              Richiedi la prova gratuita
            </Link>
          </div>
        </section>

        {/* Come funziona */}
        <section className="py-[108px]">
          <div className="shell">
            <p className="kicker text-saffron">Come funziona</p>
            <ol className="mt-10 grid gap-px sm:grid-cols-3">
              {trial.steps.map((step) => (
                <li
                  key={step.n}
                  className="flex flex-col gap-3 border-t border-cream/15 pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="font-mono text-sm text-saffron">{step.n}</span>
                  <h2 className="text-xl font-semibold tracking-tight text-cream">
                    {step.title}
                  </h2>
                  <p className="leading-relaxed text-cream/65">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cosa include + cosa non chiediamo */}
        <section className="bg-navy-deep py-[108px]">
          <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-cream">
                Cosa include
              </h2>
              <ul className="mt-6 space-y-3">
                {include.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/75">
                    <span className="mt-1 shrink-0 text-saffron">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-cream">
                Cosa non ti chiediamo
              </h2>
              <ul className="mt-6 space-y-3">
                {trial.reassurance.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/75">
                    <span className="mt-1 shrink-0 text-saffron">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Per chi è / per chi non è */}
        <section className="py-[108px]">
          <div className="shell grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-saffron/25 bg-saffron/[0.04] p-8">
              <h2 className="display text-2xl text-saffron">È per te se…</h2>
              <ul className="mt-6 space-y-3">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/75">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-white/[0.02] p-8">
              <h2 className="display text-2xl text-cream/70">Non è per te se…</h2>
              <ul className="mt-6 space-y-3">
                {notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/60">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cream/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-3xl">
            <p className="kicker text-saffron">Domande frequenti</p>
            <dl className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
              {faq.map((item) => (
                <div key={item.q} className="py-7">
                  <dt className="text-lg font-semibold text-cream">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-cream/65">{item.a}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/#contatti"
              className="mt-10 inline-block rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2"
            >
              Richiedi la prova gratuita
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
