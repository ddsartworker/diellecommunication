import Reveal from "./reveal";
import { stats } from "@/lib/site";

// Fascia sottile subito sotto l'hero. Volutamente non è un muro di numeri
// giganti: per una boutique agency i numeri grandi suonano gonfiati, mentre
// una riga che si legge come una frase dice la stessa cosa senza vantarsi.
export default function Stats() {
  return (
    <section className="border-y border-cream-rule bg-white px-4 py-7 text-navy sm:px-6">
      <Reveal className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-center gap-x-9 gap-y-3">
        {stats.map((stat) => (
          <p key={stat.label} className="flex items-baseline gap-2">
            <span className="display text-lg text-saffron-2 sm:text-xl">{stat.value}</span>
            <span className="text-sm text-navy/60">{stat.label}</span>
          </p>
        ))}
      </Reveal>
    </section>
  );
}
