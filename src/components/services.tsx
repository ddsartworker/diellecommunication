import Reveal from "./reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="servizi" className="py-[108px]">
      <div className="shell">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-saffron">Cosa facciamo</p>
            <h2 className="mt-4 text-[clamp(1.7rem,4vw,3rem)]">
              <span className="display text-cream">Tutto ciò che serve</span>{" "}
              <span className="display text-cream">per farti scegliere.</span>
            </h2>
          </div>
          <p className="max-w-xs text-cream/60">
            Otto fronti, una sola squadra. Prendi tutto o solo ciò che ti serve:
            la strategia resta cucita su misura.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-cream/10">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 70}
              className="group grid grid-cols-1 gap-6 border-b border-cream/10 py-9 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[auto_1fr_1.2fr_auto] md:items-baseline md:gap-10"
            >
              <span className="font-mono text-sm text-navy-dim transition-colors duration-300 group-hover:text-saffron">
                {s.n}
              </span>

              <h3 className="font-sans text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                <span className="text-cream">{s.title} </span>
                <span className="text-saffron">{s.accent}</span>
              </h3>

              <p className="max-w-md text-cream/65">{s.body}</p>

              <ul className="flex flex-wrap gap-2 md:justify-end">
                {s.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-cream/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-cream/55"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
