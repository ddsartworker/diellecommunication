import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, contactPage } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/contatti" },
  title: "Contatti — Parliamo del tuo progetto",
  description:
    "Prenota mezz'ora gratuita o scrivici direttamente. Dielle Communication: Napoli, Campania e da remoto in tutta Italia.",
};

export default function ContattiPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Contatti", path: "/contatti" }])} />
      <main>
        {/* Apertura corta, sul modello di leftclick.ai/contact: titolo, una
            riga di sottotitolo e l'elenco asciutto dei modi per raggiungerci.
            Email, luogo e social non stanno qui: sono nella sezione del
            modulo qui sotto, e ripeterli darebbe due volte la stessa cosa
            nella stessa schermata. */}
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden pb-[108px] pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title={contactPage.title}
              body={contactPage.body}
            />
          </div>
        </section>

        {/* I tre recapiti in tinta unita `navy-deep`, come la seconda sezione
            delle altre pagine nuove. Qui le fasce sono due e non tre: sopra
            il modulo non c'è altro da dire, e inventare una sezione per
            pareggiare il conto vorrebbe dire scrivere testo che non serve. */}
        <section className="bg-navy-deep py-[108px]">
          <div className="shell">
            <Reveal delay={90}>
              <dl className="mx-auto max-w-3xl divide-y divide-cream/10 border-y border-cream/10">
                {contactPage.details.map((d) => (
                  <div
                    key={d.label}
                    className="grid gap-1 py-5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8"
                  >
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/45 sm:pt-1.5">
                      {d.label}
                    </dt>
                    <dd className="text-cream/85">
                      {d.href ? (
                        <a
                          href={d.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-saffron"
                        >
                          {d.value} ↗
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* La stessa sezione della home: modulo a destra, recapiti a sinistra. */}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
