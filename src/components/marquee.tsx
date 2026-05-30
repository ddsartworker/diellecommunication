import { clients } from "@/lib/site";

export default function Marquee() {
  const row = [...clients, ...clients];

  return (
    <section
      aria-label="Alcuni dei nostri clienti"
      className="border-y border-white/5 bg-navy-deep py-6"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track">
          {row.map((name, i) => (
            <span key={i} className="flex items-center">
              <span className="px-7 font-mono text-sm uppercase tracking-[0.14em] text-cream/55">
                {name}
              </span>
              <span className="size-1 rounded-full bg-mint/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
