import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, services } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/servizi" },
  title: "Servizi — cosa facciamo",
  description:
    "Siti web, social, advertising, branding e molto altro, seguiti di persona da Napoli, in Campania e da remoto in tutta Italia.",
};

// L'elenco completo, e da oggi ogni voce è un link: tutti e otto i servizi
// hanno la loro pagina. Il controllo `s.page ?` resta, perché un servizio
// aggiunto in fretta senza testi deve restare testo invece di mandare
// qualcuno su una pagina che non esiste.
//
// Stessa alternanza di fondi delle altre pagine interne: apertura a
// gradiente, elenco in tinta unita, modulo in chiusura.
export default function ServiziPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Servizi", path: "/servizi" }])} />
      <main>
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden pb-[108px] pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title="Cosa facciamo."
              body={[
                // Vedi la nota in `services.tsx`: niente conteggio.
                "Le possibilità sono tante, e non servono tutte a tutti:",
                "dopo la prima call ti diciamo quali ti servono davvero.",
              ]}
            />
          </div>
        </section>

        <section className="bg-navy-deep py-[108px]">
          <div className="shell">
            <ul className="mx-auto max-w-4xl divide-y divide-cream/10 border-y border-cream/10">
              {services.map((s, i) => {
                const testa = (
                  <>
                    <p className="font-mono text-[0.65rem] text-saffron">{s.n}</p>
                    <h2 className="mt-2 text-2xl">
                      <span className="display text-cream">{s.title}</span>{" "}
                      <span className="display text-cream/45">{s.accent}</span>
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-cream/65">
                      {s.body}
                    </p>
                    <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream/40">
                      {s.tags.join(" · ")}
                    </p>
                  </>
                );

                return (
                  <li key={s.slug}>
                    <Reveal delay={Math.min(i, 5) * 60}>
                      {s.page ? (
                        <Link
                          href={`/servizi/${s.slug}`}
                          className="group block py-9 transition-opacity duration-300 hover:opacity-90"
                        >
                          {testa}
                          <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] text-saffron">
                            Vedi il servizio
                            <span aria-hidden>→</span>
                          </span>
                        </Link>
                      ) : (
                        <div className="py-9">{testa}</div>
                      )}
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
