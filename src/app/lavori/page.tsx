import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import WorkCard from "@/components/work-card";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, work } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/lavori" },
  title: "Lavori — i clienti di Dario e Luisa",
  description:
    "I clienti seguiti da Dario e Luisa: ristorazione, e-commerce, prodotti educativi, tecnologia e territorio. Per ognuno cosa è cambiato, non cosa abbiamo consegnato.",
};

// Impianto ripreso da `leftclick.ai/case-studies`, il riferimento indicato da
// Dario: apertura corta e poi **una griglia sola con tutti i lavori**. Niente
// sezioni separate fra casi studio e resto — c'erano, e Dario ha chiesto di
// toglierle: chi guarda vuole vedere tutto disposto, non due elenchi.
//
// Dove porta ogni scheda lo decidono i dati: chi ha un caso studio va alla
// sua pagina, gli altri al sito del cliente.
export default function LavoriIndex() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Lavori", path: "/lavori" }])} />
      <main>
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden section-y-b pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title="I nostri lavori."
              // Due frasi, sulla falsariga del riferimento («Real results from
              // real engagements. Every project below was built, deployed, and
              // managed by our team»): la prima dice che sono lavori veri, la
              // seconda che li abbiamo fatti noi.
              //
              // **Niente numeri qui.** C'era «Sedici clienti veri»: un numero
              // in un sottotitolo invecchia da solo — basta un cliente in più
              // e la pagina mente. Dario ha chiesto di toglierlo.
              body={[
                "Progetti veri, usciti davvero: niente concept, niente mockup da vetrina.",
                "Ognuno pensato, costruito e seguito di persona da noi due.",
              ]}
            />
          </div>
        </section>

        <section className="bg-navy-deep section-y">
          <div className="shell">
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((item, i) => (
                <Reveal key={item.slug} delay={Math.min(i, 5) * 70}>
                  <WorkCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Col gradiente: la griglia qui sopra è in tinta unita, e due
            fasce uguali attaccate si fonderebbero in una sola. */}
        <Contact glow />
      </main>
      <SiteFooter />
    </>
  );
}
