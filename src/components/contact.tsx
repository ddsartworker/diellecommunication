import Reveal from "./reveal";
import ContactForm from "./contact-form";
import { site, social } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contatti"
      className="border-t border-white/5 bg-navy-deep py-[108px]"
    >
      <div className="shell grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="kicker text-saffron">Parliamone</p>
          <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.4rem)]">
            <span className="display text-cream">Parliamo del</span>
            <span className="display mt-2 block text-cream">tuo progetto.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/70">
            Una chiacchierata gratuita, senza impegno. Ci racconti la tua
            attività, noi ti diciamo con sincerità se e come possiamo aiutarti.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={`mailto:${site.email}`}
              className="block text-xl font-semibold tracking-tight text-cream transition-colors hover:text-saffron sm:text-2xl"
            >
              {site.email}
            </a>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/50">
              {site.location}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-cream"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
