import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, faq, faqPage } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/faq" },
  title: "Domande frequenti",
  description:
    "Cosa fa Dielle Communication, chi ci lavora, quanto costa e come si comincia. Le domande che ci fanno più spesso.",
};

// Il criterio della divisione sta già nei dati: `trial` marca le domande
// sulla prova gratuita. Nessuna lista scritta a mano da tenere allineata.
const sullAgenzia = faq.filter((d) => !d.trial);
const sullaProva = faq.filter((d) => d.trial);

// Elenco semplice, senza fisarmoniche: come sul riferimento le risposte sono
// tutte in chiaro. Una domanda che si deve aprire per essere letta è una
// domanda che molti non leggono.
function Elenco({ voci }: { voci: typeof faq }) {
  return (
    <Reveal delay={90}>
      <dl className="mx-auto mt-12 max-w-3xl divide-y divide-cream/10 border-y border-cream/10">
        {voci.map((item) => (
          <div key={item.q} className="py-7">
            <dt className="text-lg font-semibold text-cream">{item.q}</dt>
            <dd className="mt-2 leading-relaxed text-cream/65">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

// Stessa alternanza di fondi delle altre pagine interne: apertura a gradiente,
// prima sezione in tinta unita `navy-deep`, seconda di nuovo a gradiente, e il
// modulo della home in chiusura. Vedi il commento in quella pagina sul
// quale blu porta la fascia in tinta unita.
export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      {/* Le nove domande in formato leggibile da Google. È l'unico blocco
          che può guadagnare spazio nei risultati: le domande compaiono
          sotto il titolo, già aperte. Le risposte sono le stesse che si
          leggono in pagina — se un giorno divergessero sarebbe un motivo di
          penalizzazione, per questo vengono dallo stesso `faq`. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((d) => ({
            "@type": "Question",
            name: d.q,
            acceptedAnswer: { "@type": "Answer", text: d.a },
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: faqPage.title, path: "/faq" }])} />
      <main>
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden section-y-b pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title={faqPage.title}
              body={faqPage.body}
            />
          </div>
        </section>

        <section className="bg-navy-deep section-y">
          <div className="shell">
            <SectionHead title={faqPage.generalTitle} />
            <Elenco voci={sullAgenzia} />
          </div>
        </section>

        <section className="surface-glow section-y">
          <div className="shell">
            <SectionHead title={faqPage.trialTitle} />
            <Elenco voci={sullaProva} />
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
