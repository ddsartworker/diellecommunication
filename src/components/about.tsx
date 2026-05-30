import Image from "next/image";
import Reveal from "./reveal";
import { founders } from "@/lib/site";

// Su fondo chiaro servono i toni scuri (mint-2 / saffron-2) per il contrasto.
const accentText: Record<string, string> = {
  saffron: "text-saffron-2",
  mint: "text-mint-2",
};
const accentPanel: Record<string, string> = {
  saffron: "bg-saffron/15 text-saffron-2",
  mint: "bg-mint/20 text-mint-2",
};

export default function About() {
  return (
    <section id="studio" className="bg-cream px-6 py-24 text-navy sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker text-saffron-2">Chi siamo</p>
        </Reveal>

        <Reveal delay={80}>
          <blockquote className="mt-8 max-w-4xl text-[clamp(1.45rem,3.4vw,2.5rem)] leading-[1.12]">
            <span className="display text-navy">«Due persone che ti ascoltano,</span>{" "}
            <span className="display text-saffron-2">non un reparto che ti rimbalza.»</span>
          </blockquote>
        </Reveal>

        <Reveal delay={120} className="mt-8 max-w-2xl text-lg leading-relaxed text-navy/70">
          <p>
            Dielle Communication nasce dopo oltre dieci anni di esperienza, per
            offrire un&apos;alternativa alle agenzie strutturate. Niente referenti
            che cambiano, niente team che non vedrai mai: lavori sempre
            direttamente con noi.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {founders.map((person, i) => (
            <Reveal key={person.name} delay={140 + i * 90} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={`Ritratto di ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover"
                  />
                ) : (
                  // TODO: sostituire con la foto professionale in /public/team/
                  <div
                    className={`flex h-full items-center justify-center ${accentPanel[person.accent]}`}
                  >
                    <span className="display text-[6rem] leading-none sm:text-[8rem]">
                      {person.initials}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-navy">
                {person.name}
              </h3>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy/55">
                {person.role}
              </p>
              <p className={`mt-5 text-lg italic leading-snug sm:text-xl ${accentText[person.accent]}`}>
                «{person.quote}»
              </p>
              <p className="mt-4 text-navy/70 leading-relaxed">{person.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
