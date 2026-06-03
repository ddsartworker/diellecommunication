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
              <span className="display px-7 text-[0.72rem] uppercase tracking-[0.18em] text-cream">
                {name}
              </span>
              <span className="size-1 rounded-full bg-cream" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
