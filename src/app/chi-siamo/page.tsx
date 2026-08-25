import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { aboutPage, breadcrumbSchema, founders, services } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/chi-siamo" },
  title: "Chi siamo — Dario & Luisa",
  description: aboutPage.lead,
};

// Le quattro schede non ricopiano i testi dei servizi: `aboutPage.featured`
// contiene solo i titoli, e il resto si pesca da `services`. Ognuna porta
// alla pagina del servizio.
const scelti = aboutPage.featured
  .map((titolo) => services.find((s) => s.title === titolo))
  .filter((s): s is (typeof services)[number] => Boolean(s));

// Questa pagina ha inglobato `/dl-communication`, che diceva le stesse cose:
// decisione di Dario del 24 agosto 2026. Niente è andato perso, i due testi
// sono stati fusi in `aboutPage`.
//
// I fondi si alternano come nelle altre pagine interne: gradiente, tinta
// unita, gradiente, e così via fino al modulo.
export default function ChiSiamoPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={breadcrumbSchema([{ name: "Chi siamo", path: "/chi-siamo" }])} />
      <main>
        {/* 1. Apertura */}
        <section className="surface-glow relative flex min-h-[58svh] flex-col justify-center overflow-hidden section-y-b pt-40 text-cream sm:pt-48">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title={aboutPage.title}
              body={aboutPage.subtitle}
            />
          </div>
        </section>

        {/* 2. Chi siamo, per esteso. Tutti i capoversi con la stessa
            formattazione: se ne aggiungi uno non dargli una classe sua. */}
        <section className="bg-navy-deep section-y">
          <div className="shell">
            <Reveal>
              <div className="mx-auto max-w-3xl space-y-6">
                {[aboutPage.lead, ...aboutPage.intro].map((p) => (
                  <p
                    key={p}
                    className="text-pretty text-lg leading-relaxed text-cream/75"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-cream/10 bg-cream/[0.03] p-8 sm:p-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-saffron">
                  {aboutPage.notTitle}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-cream/75">
                  {aboutPage.notBody}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. I valori */}
        <section className="surface-glow section-y">
          <div className="shell">
            <SectionHead title={aboutPage.valuesTitle} />
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {aboutPage.values.map((value, i) => (
                <Reveal key={value.title} delay={i * 90}>
                  <div className="border-t border-cream/15 pt-6">
                    <h2 className="text-xl font-semibold tracking-tight text-cream">
                      {value.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-cream/65">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cosa costruiamo: le quattro schede portano alle pagine vere. */}
        <section className="bg-navy-deep section-y">
          <div className="shell">
            <SectionHead title={aboutPage.buildTitle} body={aboutPage.buildBody} />
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {scelti.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <Link
                    href={s.page ? `/servizi/${s.slug}` : "/servizi"}
                    className="block h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-7 transition-colors duration-300 hover:border-saffron/40"
                  >
                    <p className="font-mono text-[0.65rem] text-saffron">{s.n}</p>
                    <h3 className="mt-3 text-xl">
                      <span className="display text-cream">{s.title}</span>{" "}
                      <span className="display text-cream/45">{s.accent}</span>
                    </h3>
                    <p className="mt-3 leading-relaxed text-cream/65">{s.body}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. I fondatori */}
        <section className="surface-glow section-y text-cream">
          <div className="shell">
            <SectionHead title="I fondatori." />
            {/* Stessa soglia di `about.tsx`: vedi il commento lì. Prima questa
                pagina si apriva a `md` e la home a `sm` — due comportamenti
                diversi per lo stesso blocco. */}
            <div className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-12">
              {founders.map((person) => (
                <div key={person.name} className="mx-auto w-full max-w-[26rem] text-left">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Ritratto di ${person.name}`}
                        fill
                        sizes="(max-width: 475px) 88vw, 26rem"
                        quality={90}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-cream/90 text-navy">
                        <span className="display text-[4.5rem] leading-none">
                          {person.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-cream">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-cream/55">{person.role}</p>
                  <p className="mt-4 text-lg italic leading-snug text-saffron">
                    «{person.quote}»
                  </p>
                  <p className="mt-4 leading-relaxed text-cream/65">{person.bio}</p>
                </div>
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
