import Image from "next/image";
import Reveal from "./reveal";
import { founders } from "@/lib/site";

export default function About() {
  return (
    <section id="studio" className="surface-glow py-[108px] text-cream">
      {/* Stesso impianto delle sezioni precedenti: niente kicker, titolo e
          sottotitolo centrati e di un colore solo. */}
      <div className="shell text-center">
        <Reveal>
          <h2 className="mx-auto max-w-6xl text-balance text-[clamp(1.6rem,3.6vw,2.7rem)]">
            <span className="display text-cream">
              «Due persone che ti ascoltano, non un reparto che ti rimbalza.»
            </span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-cream/60">
            Dielle Communication nasce dopo oltre dieci anni di esperienza, per
            offrire un&apos;alternativa alle agenzie strutturate. Niente
            referenti che cambiano, niente team che non vedrai mai: lavori
            sempre direttamente con noi.
          </p>
        </Reveal>

        {/* Ritratti quadrati e contenuti, come nel riferimento. Dentro la
            scheda tutto è allineato a sinistra — foto, nome, ruolo, testo —
            mentre titolo e sottotitolo della sezione restano centrati. */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-2 sm:gap-10">
          {founders.map((person, i) => (
            <Reveal key={person.name} delay={140 + i * 90}>
              {/* Foto e testi condividono la stessa larghezza e gli stessi
                  bordi, come nel riferimento: il testo non sborda mai oltre
                  il quadrato. Il blocco intero è centrato nella colonna. */}
              <div className="mx-auto w-full max-w-[20rem] text-left">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={`Ritratto di ${person.name}`}
                      fill
                      sizes="(max-width: 640px) 70vw, 17rem"
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
                <p className="mt-1 text-cream/55">{person.role}</p>
                <p className="mt-4 text-lg italic leading-snug text-saffron">
                  «{person.quote}»
                </p>
                <p className="mt-4 leading-relaxed text-cream/65">
                  {person.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
