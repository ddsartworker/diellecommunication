import SectionHead from "./section-head";
import Reveal from "./reveal";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section className="bg-cream py-[108px] text-navy">
      <div className="shell">
        <SectionHead
          tone="light"
          title="Non fidarti di noi. Fidati di chi ci ha provato."
        />

        {lead && (
          <Reveal delay={80}>
            <blockquote className="mt-14 max-w-4xl">
              <p className="display text-[clamp(1.35rem,3vw,2.2rem)] leading-[1.18] text-navy">
                «{lead.quote}»
              </p>
              <footer className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy/55">
                {lead.author} — {lead.detail}
              </footer>
            </blockquote>
          </Reveal>
        )}

        <div className="mt-16 grid gap-10 border-t border-cream-rule pt-12 sm:grid-cols-2 sm:gap-14">
          {rest.map((t, i) => (
            <Reveal key={t.detail} delay={120 + i * 80}>
              <p className="text-xl leading-relaxed text-navy/80">«{t.quote}»</p>
              <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy/55">
                {t.author} — {t.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
