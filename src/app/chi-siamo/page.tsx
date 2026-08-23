import type { Metadata } from "next";
import Image from "next/image";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { founders } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi siamo — Dario & Luisa",
  description:
    "Dielle Communication è la boutique agency di Dario De Sisto e Luisa Panariello. Pochi clienti, seguiti di persona, una comunicazione che cresce con te.",
};

const values = [
  {
    title: "Su misura",
    body: "Niente pacchetti uguali per tutti. Ogni strategia parte dalla tua attività e da quello che ti rende diverso.",
  },
  {
    title: "Di persona",
    body: "Lavori sempre con noi due. Nessun referente che cambia, nessun team che non vedrai mai.",
  },
  {
    title: "A numero chiuso",
    body: "Accettiamo pochi clienti per volta. È così che restiamo presenti e curiamo davvero ogni dettaglio.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-8 pt-36 sm:pt-44">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title="Dietro Dielle ci siamo noi. Sempre."
            />
            <div className="mx-auto mt-8 grid max-w-3xl gap-5 text-lg leading-relaxed text-cream/70">
              <p>
                Dielle Communication nasce dall&apos;unione professionale di Dario
                De Sisto e Luisa Panariello, dopo oltre dieci anni di esperienza
                ciascuno. È nata da un&apos;idea semplice: offrire un&apos;alternativa
                alle agenzie strutturate, dove il cliente cambia referente di
                continuo e riceve pacchetti uguali per tutti.
              </p>
              <p>
                Noi facciamo il contrario. Seguiamo direttamente ogni cliente,
                accettandone pochi per volta, per garantire qualità, presenza e
                continuità. Non vendiamo servizi: costruiamo una comunicazione che
                evolve nel tempo insieme alla tua attività.
              </p>
            </div>
          </div>
        </section>

        {/* Valori */}
        <section className="py-[108px]">
          <div className="shell">
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {values.map((value) => (
                <div key={value.title} className="border-t border-cream/15 pt-6">
                  <h2 className="text-xl font-semibold tracking-tight text-cream">
                    {value.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-cream/65">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fondatori */}
        <section className="surface-glow py-[108px] text-cream">
          <div className="shell">
            <SectionHead title="I fondatori." />
            <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:grid-cols-2 md:gap-12">
              {founders.map((person) => (
                <div key={person.name} className="mx-auto w-full max-w-[26rem] text-left">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Ritratto di ${person.name}`}
                        fill
                        sizes="(max-width: 640px) 90vw, 26rem"
                        quality={90}
                        className="object-cover"
                      />
                    ) : (
                      // TODO: sostituire con la foto professionale in /public/team/
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
                  <p className="mt-1 text-cream/55">
                    {person.role}
                  </p>
                  <p className="mt-4 text-lg italic leading-snug text-saffron">
                    «{person.quote}»
                  </p>
                  <p className="mt-4 leading-relaxed text-cream/65">
                    {person.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
