import { stats } from "@/lib/site";

// Riga di numeri che vive dentro l'apertura, sopra i pulsanti, come nel
// riferimento. Volutamente non è un muro di numeri giganti: per una boutique
// agency i numeri grandi suonano gonfiati, mentre una riga che si legge come
// una frase dice la stessa cosa senza vantarsi.
export default function Stats({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex max-w-3xl flex-wrap items-baseline justify-center gap-x-9 gap-y-3 ${className}`}
    >
      {stats.map((stat) => (
        <p key={stat.label} className="flex items-baseline gap-2">
          <span className="display text-lg text-saffron sm:text-xl">{stat.value}</span>
          <span className="text-sm text-cream/55">{stat.label}</span>
        </p>
      ))}
    </div>
  );
}
