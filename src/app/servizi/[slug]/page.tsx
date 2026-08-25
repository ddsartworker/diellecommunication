import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, site, siteUrl, servicesWithPage } from "@/lib/site";

// Una pagina per ogni servizio che ha `page` in `site.ts`. Aggiungere quel
// campo a un servizio fa nascere la pagina da sé: qui non c'è nessun elenco
// di indirizzi scritto a mano.
export function generateStaticParams() {
  return servicesWithPage.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servizio = servicesWithPage.find((s) => s.slug === slug);
  if (!servizio) return {};
  return {
    alternates: { canonical: `/servizi/${slug}` },
    title: servizio.page.metaTitle,
    description: servizio.page.metaDescription,
  };
}

export default async function ServizioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servizio = servicesWithPage.find((s) => s.slug === slug);
  if (!servizio) notFound();

  const { page } = servizio;
  const altri = servicesWithPage.filter((s) => s.slug !== slug);

  return (
    <>
      <SiteHeader />
      {/* Cosa offre questa pagina, e dove sta nel sito. Niente prezzi: non
          esiste un listino, e dichiararne uno qui sarebbe una dichiarazione
          pubblica falsa. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${servizio.title} ${servizio.accent}`,
          description: page.lead,
          serviceType: servizio.tags,
          url: `${siteUrl}/servizi/${servizio.slug}`,
          provider: { "@id": `${siteUrl}/#organizzazione` },
          areaServed: [
            { "@type": "City", name: "Napoli" },
            { "@type": "AdministrativeArea", name: "Campania" },
          ],
          audience: { "@type": "Audience", audienceType: site.tagline },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Servizi", path: "/servizi" },
          { name: servizio.title, path: `/servizi/${servizio.slug}` },
        ])}
      />
      <main>
        {/* Stessa alternanza di fondi delle altre pagine interne. */}
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden section-y-b pt-40 text-cream sm:pt-48">
          <div className="shell">
            <Reveal className="text-center">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-saffron">
                {servizio.tags.join(" · ")}
              </p>
            </Reveal>
            <SectionHead
              as="h1"
              size="xl"
              className="mt-5"
              title={`${servizio.title} ${servizio.accent}`}
              body={page.lead}
            />
          </div>
        </section>

        {/* Per chi è. Non promesse: situazioni in cui riconoscersi. */}
        <section className="bg-navy-deep section-y">
          <div className="shell">
            <SectionHead title="Serve a te se…" />
            <ul className="mx-auto mt-12 max-w-3xl divide-y divide-cream/10 border-y border-cream/10">
              {page.forWho.map((riga, i) => (
                <li key={riga}>
                  <Reveal delay={i * 80}>
                    <p className="flex gap-4 py-5 text-lg leading-relaxed text-cream/75">
                      <span aria-hidden className="text-saffron">
                        →
                      </span>
                      <span>{riga}</span>
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cosa comprende, e subito sotto cosa non facciamo. */}
        <section className="surface-glow section-y">
          <div className="shell">
            <SectionHead title="Cosa comprende" />
            <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {page.included.map((riga, i) => (
                <li key={riga}>
                  <Reveal delay={Math.min(i, 5) * 70}>
                    <p className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 leading-relaxed text-cream/75">
                      {riga}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={140}>
              <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-cream/10 bg-cream/[0.03] p-8 sm:p-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-saffron">
                  {page.notTitle}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-cream/75">
                  {page.notBody}
                </p>
              </div>
            </Reveal>

            {/* Gli altri servizi con una pagina propria: una riga sola, per
                chi è arrivato qui da Google e non sa cos'altro facciamo. */}
            <Reveal delay={200}>
              {/* Nove link in fila dentro una riga di testo a 9,9px: da
                  computer si legge, col dito no — ogni bersaglio era alto
                  12px. Su schermo stretto il corpo sale e le righe si
                  distanziano, così le aree toccabili delle righe vicine non
                  si sovrappongono. */}
              <p className="mt-14 text-center font-mono text-[0.7rem] uppercase leading-[2.4] tracking-[0.14em] text-cream/45 sm:text-[0.62rem] sm:leading-normal">
                Vedi anche{" "}
                {altri.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 ? " · " : ""}
                    <Link
                      href={`/servizi/${s.slug}`}
                      className="inline-block py-2 text-cream/70 transition-colors duration-300 hover:text-saffron sm:py-0"
                    >
                      {s.title}
                    </Link>
                  </span>
                ))}
                {" · "}
                <Link
                  href="/servizi"
                  className="inline-block py-2 text-cream/70 transition-colors duration-300 hover:text-saffron sm:py-0"
                >
                  Tutti i servizi
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
