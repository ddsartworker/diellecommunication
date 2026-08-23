import SectionHead from "./section-head";
import Reveal from "./reveal";
import ContactForm from "./contact-form";
import { site, social } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contatti"
      className="bg-navy-deep py-[108px]"
    >
      <div className="shell">
        <SectionHead
          size="lg"
          title="Parliamo del tuo progetto."
          body={[
            "Una chiacchierata gratuita, senza impegno. Ci racconti la tua attività,",
            "noi ti diciamo con sincerità se e come possiamo aiutarti.",
          ]}
        />
      </div>

      <div className="shell mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="space-y-5">
            <a
              href={`mailto:${site.email}`}
              className="block text-xl font-semibold tracking-tight text-cream underline-offset-[6px] transition-colors duration-300 hover:text-saffron hover:underline hover:decoration-saffron sm:text-2xl"
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
