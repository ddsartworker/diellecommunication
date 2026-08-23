import SectionHead from "./section-head";
import Reveal from "./reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    // Fondo a gradiente come l'apertura: le sezioni si alternano una sfumata e
    // una in tinta unita (metodo e strumenti sono `navy-deep`).
    <section id="servizi" className="surface-glow py-[108px]">
      <div className="shell">
        <SectionHead
          title="Tutto ciò che serve per farti scegliere."
          body={[
            "Otto fronti, una sola squadra. Prendi tutto o solo ciò che ti serve:",
            "la strategia resta cucita su misura.",
          ]}
        />

        <div className="mt-16 border-t border-cream/10">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 70}
              className="group grid grid-cols-1 gap-6 border-b border-cream/10 py-9 transition-colors duration-500 hover:bg-cream/[0.03] lg:grid-cols-[2.5rem_minmax(0,15rem)_minmax(0,28rem)_1fr] lg:items-baseline lg:gap-10"
            >
              <span className="font-mono text-sm text-navy-dim transition-colors duration-300 group-hover:text-saffron">
                {s.n}
              </span>

              <h3 className="font-sans text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                <span className="text-cream">{s.title} </span>
                <span className="text-cream">{s.accent}</span>
              </h3>

              <p className="text-cream/65">{s.body}</p>

              <ul className="flex flex-wrap gap-2 lg:justify-end">
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
