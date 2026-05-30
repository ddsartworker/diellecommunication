import { site } from "@/lib/site";

const trust = [
  "Seguiti dai fondatori",
  "A numero chiuso",
  "Napoli · Campania · Italia",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 sm:pt-44"
    >
      {/* soft saffron glow, low and off-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[40rem] rounded-full bg-saffron/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="kicker flex items-center gap-3 text-saffron">
          <span className="size-1.5 rounded-full bg-saffron" />
          {site.tagline}
        </p>

        <h1 className="mt-8 max-w-4xl text-[clamp(1.5rem,5vw,3.5rem)]">
          <span className="display block text-cream">
            Il marketing non deve essere complicato.
          </span>
          <span className="display mt-3 block text-saffron">
            Deve portarti clienti.
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-cream/75 sm:text-xl">
            Costruiamo la tua comunicazione su misura e la seguiamo di persona,
            dal primo giorno. Pochi clienti, perché ognuno merita attenzione
            vera.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href="#prova"
              className="rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2"
            >
              Richiedi la prova gratuita
            </a>
            <a
              href="#metodo"
              className="rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream transition-colors duration-300 hover:border-cream/60"
            >
              Scopri il metodo
            </a>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/5 pt-6">
          {trust.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream/55"
            >
              <span className="size-1 rounded-full bg-mint" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
