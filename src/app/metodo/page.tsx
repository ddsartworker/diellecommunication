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
// I fondi si alternano come nelle altre pagine interne.
export default function MetodoPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Il metodo", path: "/metodo" }])} />
      <main>
        {/* 1. Apertura */}
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden pb-[108px] pt-40 text-cream sm:pt-48">
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
        <section className="bg-navy-deep py-[108px]">
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
        <section className="surface-glow py-[108px]">
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

            <Reveal delay={200}>
              <ul className="mx-auto mt-14 max-w-3xl divide-y divide-cream/10 border-y border-cream/10">
                {processPage.expect.map((r) => (
                  <li
                    key={r}
                    className="flex gap-4 py-5 leading-relaxed text-cream/75"
                  >
                    <span aria-hidden className="text-saffron">
                      →
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 4. Il confronto */}
        <section className="bg-navy-deep py-[108px]">
          <div className="shell">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-[clamp(1.6rem,3.8vw,2.7rem)]">
                <span className="display text-cream">{methodPage.compareTitle}</span>
              </h2>
              <div className="mt-10 overflow-hidden rounded-2xl border border-cream/10">
                <div className="grid grid-cols-2 border-b border-cream/10 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                  <p className="border-r border-cream/10 p-5 text-cream/45">
                    {methodPage.compareThem}
                  </p>
                  <p className="p-5 text-saffron">{methodPage.compareUs}</p>
                </div>
                {methodPage.compare.map((row) => (
                  <div
                    key={row.us}
                    className="grid grid-cols-2 border-b border-cream/10 last:border-b-0"
                  >
                    <p className="border-r border-cream/10 p-5 text-cream/55">
                      {row.them}
                    </p>
                    <p className="p-5 text-cream/90">{row.us}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Perché funziona */}
        <section className="surface-glow py-[108px]">
          <div className="shell">
            <SectionHead title={methodPage.whyTitle} />
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {methodPage.why.map((point, i) => (
                <Reveal key={point.title} delay={i * 90}>
                  <div className="border-t border-cream/15 pt-6">
                    <h3 className="text-xl font-semibold tracking-tight text-cream">
                      {point.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-cream/65">
                      {point.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
