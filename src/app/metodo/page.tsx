import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, method, methodPage, processPage } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/metodo" },
  title: "Il metodo — come lavoriamo, passo per passo",
  description:
    "Niente pacchetti uguali per tutti. Come lavora Dielle Communication e cosa succede dalla prima call alla partenza: cinque passi, quattro passaggi, seguiti di persona.",
};

// Questa pagina ha inglobato `/processo`: decisione di Dario del 24 agosto
// 2026. Le due si sfioravano da sempre — qui la filosofia, lì la procedura —
// e AGENTS.md avvertiva che prima o poi sarebbero diventate la stessa cosa.
// Ora la differenza è dichiarata dalla struttura: prima **come lavoriamo**
// (i cinque passi), poi **cosa succede a chi ci contatta** (i quattro
// passaggi). `/processo` rimanda qui.
//
// Le sezioni sono quattro, ed erano sei fino al 25 agosto 2026: l'elenco
// «Cosa ti aspetta» sotto i passaggi e la sezione «Perché funziona» dicevano
// le stesse cose delle sezioni accanto — vedi i commenti in `site.ts`, dove
// stavano i dati. Non rimetterle: la pagina ripeteva lo stesso quartetto di
// promesse tre volte.
//
// I fondi si alternano come nelle altre pagine interne.
export default function MetodoPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Il metodo", path: "/metodo" }])} />
      <main>
        {/* 1. Apertura */}
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden section-y-b pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title={methodPage.title}
              body={methodPage.body}
            />
          </div>
        </section>

        {/* 2. Come lavoriamo: i cinque passi */}
        <section className="bg-navy-deep section-y">
          <div className="shell">
            <SectionHead title={methodPage.stepsTitle} />
            <div className="mx-auto mt-14 max-w-5xl border-t border-cream/10">
              {method.map((step, i) => (
                <Reveal key={step.n} delay={Math.min(i, 4) * 70}>
                  <div className="grid gap-4 border-b border-cream/10 py-9 md:grid-cols-[3rem_1fr_1fr] md:gap-10">
                    <span className="font-mono text-sm text-saffron">{step.n}</span>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
                        {step.title}
                      </h2>
                      <p className="mt-3 max-w-md leading-relaxed text-cream/65">
                        {step.body}
                      </p>
                    </div>
                    <dl className="flex flex-col gap-4 md:items-end md:text-right">
                      <div>
                        <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-saffron">
                          Cosa ottieni
                        </dt>
                        <dd className="mt-1 max-w-xs text-cream/80">
                          {methodPage.detail[step.n]?.gain}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-cream/45">
                          Quanto dura
                        </dt>
                        <dd className="mt-1 text-cream/80">
                          {methodPage.detail[step.n]?.time}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Cosa succede a chi ci contatta: i quattro passaggi. Era la
            pagina `/processo`. Qui sotto, «cosa ti aspetta» durante il
            lavoro. */}
        <section className="surface-glow section-y">
          <div className="shell">
            <SectionHead title={processPage.title} body={processPage.body} />
            <ol className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
              {processPage.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <li className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-7">
                    <p className="font-mono text-[0.65rem] text-saffron">{s.n}</p>
                    <h3 className="mt-3 text-xl">
                      <span className="display text-cream">{s.title}</span>
                    </h3>
                    <p className="mt-3 leading-relaxed text-cream/65">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Il confronto */}
        <section className="bg-navy-deep section-y">
          <div className="shell">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-[clamp(1.6rem,3.8vw,2.7rem)]">
                <span className="display text-cream">{methodPage.compareTitle}</span>
              </h2>
              {/* La tabella era `grid-cols-2` a qualunque larghezza. Su un
                  telefono da 320px ogni cella restava **139px larga e 123px
                  alta** — misurato — cioè quattro righe di testo spezzato in
                  due colonne strette appaiate. Da 640px in su resta la
                  tabella di prima; sotto, ogni confronto diventa un blocco
                  con le due voci una sopra l'altra.

                  Le due etichette si ripetono su ogni blocco, ed è voluto:
                  impilando le celle si perde l'intestazione, e senza un
                  richiamo non si sa più quale delle due frasi è la nostra.
                  Sono le stesse due stringhe di `site.ts`, non testo nuovo. */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-cream/10">
                <div className="hidden border-b border-cream/10 font-mono text-[0.65rem] uppercase tracking-[0.14em] sm:grid sm:grid-cols-2">
                  <p className="border-r border-cream/10 p-5 text-cream/45">
                    {methodPage.compareThem}
                  </p>
                  <p className="p-5 text-saffron">{methodPage.compareUs}</p>
                </div>
                {methodPage.compare.map((row) => (
                  <div
                    key={row.us}
                    className="grid border-b border-cream/20 last:border-b-0 sm:grid-cols-2 sm:border-cream/10"
                  >
                    <div className="border-b border-cream/[0.07] p-5 sm:border-b-0 sm:border-r sm:border-cream/10">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream/40 sm:hidden">
                        {methodPage.compareThem}
                      </p>
                      <p className="mt-2 text-cream/55 sm:mt-0">{row.them}</p>
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron sm:hidden">
                        {methodPage.compareUs}
                      </p>
                      <p className="mt-2 text-cream/90 sm:mt-0">{row.us}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Il modulo sta sul gradiente, non in tinta unita: la sezione qui
            sopra è già `bg-navy-deep`, e due fasce uguali attaccate si
            fondono in una sola. È la stessa ragione per cui `/lavori` usa
            `<Contact glow />`. Serve da quando è uscita la sezione «Perché
            funziona», che stava fra la tabella e il modulo. */}
        <Contact glow />
      </main>
      <SiteFooter />
    </>
  );
}
